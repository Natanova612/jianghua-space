# -*- coding: utf-8 -*-
"""
生成「华」字白文名章 public/seal.png（纸面钤印质感）

字体：敬峰中山王篆 JFZSKSealScript（SIL OFL 1.1）
  来源：https://github.com/jeffi369/JFZSKSealScript
  下载 fonts/JFZSKSealScript_V3.ttf 到本脚本同目录（或指定 --font 路径）

质感管线：
  1. 手抖边界的朱砂圆角方印 + 白文「华」
  2. 高频噪点：印泥颗粒 + 磨损斑点（局部露纸）
  3. 低频明暗：印泥蘸取不均的深浅变化
  4. 轻微高斯模糊：油墨洇纸
  5. 整体微旋转：手盖的自然歪斜
运行：python scripts/generate-seal.py
"""
import argparse
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps, ImageChops

S = 1200                      # 画布边长
PAPER = (247, 243, 236)       # 纸色 #f7f3ec
CINNABAR = (200, 57, 31)      # 朱砂 #c8391f

random.seed(42)


def jittered_rounded_rect(size, inset, radius, jitter=3.0, step=24):
    """沿圆角矩形轮廓采样并加随机抖动，返回多边形顶点。"""
    l, t, r, b = inset, inset, size - inset, size - inset
    pts = []
    corners = [
        (l + radius, t + radius, math.pi, math.pi * 1.5),
        (r - radius, t + radius, math.pi * 1.5, math.pi * 2),
        (r - radius, b - radius, 0, math.pi * 0.5),
        (l + radius, b - radius, math.pi * 0.5, math.pi),
    ]
    # 顶边 / 右边 / 底边 / 左边 的直线段 + 圆角弧
    edges = [
        ("h", l + radius, r - radius, t),
        ("v", t + radius, b - radius, r),
        ("h", r - radius, l + radius, b),
        ("v", b - radius, t + radius, l),
    ]
    # 顺序：边 → 该边末端的圆角（顶边→右上角弧→右边→右下角弧→…）
    for i in range(4):
        d, x0, x1, fixed = edges[i]
        if d == "h":
            xs = range(int(min(x0, x1)), int(max(x0, x1)), step)
            pts += [(x, fixed + random.uniform(-jitter, jitter)) for x in xs]
        else:
            ys = range(int(min(x0, x1)), int(max(x0, x1)), step)
            pts += [(fixed + random.uniform(-jitter, jitter), y) for y in ys]
        cx, cy, a0, a1 = corners[(i + 1) % 4]
        n = 8
        for k in range(n + 1):
            a = a0 + (a1 - a0) * k / n
            pts.append((
                cx + radius * math.cos(a) + random.uniform(-jitter, jitter),
                cy + radius * math.sin(a) + random.uniform(-jitter, jitter),
            ))
    return pts


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--font", default="JFZSKSealScript_V3.ttf")
    ap.add_argument("--out", default="../public/seal.png")
    ap.add_argument("--preview", default=None)
    args = ap.parse_args()

    # --- 1. 印面：朱砂底 + 白文字 ---
    seal = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(seal)
    d.polygon(jittered_rounded_rect(S, inset=70, radius=70), fill=CINNABAR + (255,))

    font = ImageFont.truetype(args.font, 780)
    bbox = d.textbbox((0, 0), "华", font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    # 篆体偏修长，横向微拉伸以更饱满地填入方印
    char = Image.new("RGBA", (w + 40, h + 40), (0, 0, 0, 0))
    cd = ImageDraw.Draw(char)
    cd.text((20 - bbox[0], 20 - bbox[1]), "华", font=font, fill=PAPER + (255,))
    char = char.resize((int(char.width * 1.3), char.height), Image.LANCZOS)
    seal.alpha_composite(char, ((S - char.width) // 2, (S - char.height) // 2))

    # --- 2. 油墨洇纸：轻微模糊 ---
    seal = seal.filter(ImageFilter.GaussianBlur(1.6))

    # --- 3. 印泥质感：高频颗粒 + 磨损露纸 ---
    fine = Image.effect_noise((S, S), 90).resize((S, S))
    fine = ImageOps.autocontrast(fine, cutoff=1)
    # 高频：把噪点映射为 0.78~1.0 的透明度系数（颗粒感但不至于沙化）
    fine_alpha = fine.point(lambda v: int(200 + (v / 255) * 55))

    # 磨损斑点：极少数极高值处露纸
    speck = fine.point(lambda v: 60 if v > 253 else 255)

    # --- 4. 低频明暗：蘸泥不均 ---
    low = Image.effect_noise((40, 40), 60).resize((S, S), Image.BICUBIC)
    low = ImageOps.autocontrast(low, cutoff=1)
    low_alpha = low.point(lambda v: int(205 + (v / 255) * 50))

    alpha = seal.getchannel("A")
    alpha = ImageChops.multiply(alpha, fine_alpha)
    alpha = ImageChops.multiply(alpha, speck)
    alpha = ImageChops.multiply(alpha, low_alpha)
    seal.putalpha(alpha)

    # --- 5. 手盖歪斜 ---
    seal = seal.rotate(-2.2, resample=Image.BICUBIC, center=(S / 2, S / 2))

    # --- 6. 输出：站点只需 512px（logo 展示尺寸 ≤64px） ---
    seal_small = seal.resize((512, 512), Image.LANCZOS)
    seal_small.save(args.out, optimize=True)
    print("saved:", args.out)

    if args.preview:
        bg = Image.new("RGBA", (S, S), PAPER + (255,))
        bg.alpha_composite(seal)
        bg.convert("RGB").save(args.preview)
        print("saved:", args.preview)


if __name__ == "__main__":
    main()
