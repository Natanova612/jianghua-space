# -*- coding: utf-8 -*-
"""
将《富春山居图》长卷局部洗成站点背景底图 public/images/landscape-bg.jpg

处理：
  1. 与纸色 #f7f3ec 按比例混合（洗淡如水印）
  2. 垂直渐变：顶部 45% 完全洗为纸色（保证文字区干净），向下渐入画面
  3. 轻微高斯模糊去 JPEG 噪点
输入图（黄公望《富春山居图》，公有领域）需先旋转为横向，路径用 --src 指定。
运行：python scripts/process-landscape.py --src <横向图路径>
"""
import argparse
from PIL import Image, ImageFilter

PAPER = (247, 243, 236)  # #f7f3ec


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True)
    ap.add_argument("--out", default="../public/images/landscape-bg.jpg")
    ap.add_argument("--wash", type=float, default=0.82, help="与纸色混合比例（越大越淡）")
    args = ap.parse_args()

    img = Image.open(args.src).convert("RGB")
    w, h = img.size
    print("src:", img.size)

    paper = Image.new("RGB", (w, h), PAPER)

    # 垂直渐变遮罩：0（顶，纯纸色）→ 255（约 55% 高度起，充分显示）
    mask = Image.new("L", (1, h))
    px = mask.load()
    fade_end = int(h * 0.55)
    for y in range(h):
        if y < fade_end:
            px[0, y] = int(255 * (y / fade_end) ** 1.6 * (1 - args.wash * 0))  # 0→255
        else:
            px[0, y] = 255
    mask = mask.resize((w, h))

    # 先按 wash 比例洗淡，再按垂直渐变与纸色合成
    washed = Image.blend(paper, img, 1 - args.wash)
    out = Image.composite(washed, paper, mask)

    out = out.filter(ImageFilter.GaussianBlur(0.6))
    out.save(args.out, quality=82, optimize=True)
    print("saved:", args.out, out.size)


if __name__ == "__main__":
    main()
