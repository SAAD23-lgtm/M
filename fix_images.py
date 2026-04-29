from pathlib import Path
import re

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont


SOURCE_DIR = Path("public/images/products")
OUTPUT_DIR = Path("public/images/products_refined")
DATA_FILE = Path("src/data/products.ts")
CANVAS_SIZE = (1400, 1100)
TRIM_THRESHOLD = 18
PADDING_RATIO = 0.08
MAX_FILL_RATIO = 0.9
EDGE_CROP_RATIO = 0.08
LOGO_RECT = (0.58, 0.02, 0.97, 0.24)

ALIASES = {
    "WhatsApp_Image_2026-03-22_at_9.00.48_PM_2.jpg": "WhatsApp_Image_2026-03-22_at_9.00.48_PM_4.jpg",
    "WhatsApp_Image_2026-03-22_at_9.00.48_PM_3.jpg": "WhatsApp_Image_2026-03-22_at_9.00.48_PM_4.jpg",
}

PLACEHOLDERS = {
    "WhatsApp_Image_2026-03-22_at_9.00.47_PM_2.jpg": {"brand": "Neotrel", "kind": "case", "accent": (18, 143, 214)},
    "image2.jpg": {"brand": "Fayha", "kind": "gallon", "accent": (36, 155, 214)},
    "image6.jpg": {"brand": "Tania", "kind": "gallon", "accent": (76, 127, 230)},
    "image7.jpg": {"brand": "Munhal", "kind": "gallon", "accent": (28, 91, 184)},
}

ACCENT_COLORS = [
    (14, 116, 144),
    (2, 132, 199),
    (22, 163, 74),
    (217, 119, 6),
    (190, 24, 93),
    (124, 58, 237),
]


def normalize_source_name(source_path: Path) -> str | None:
    if source_path.stem == "contact_sheet":
        return None

    match = re.match(r"^(WhatsApp) Image (.+?) \((\d+)\)$", source_path.stem)
    if match:
        stem = f"{match.group(1)}_Image_{match.group(2).replace(' ', '_')}_{match.group(3)}"
    else:
        stem = source_path.stem.replace(" ", "_")

    return f"{stem}.jpg"


def remove_branding(image: Image.Image) -> Image.Image:
    rgb = image.convert("RGB")
    inset = max(18, int(min(rgb.size) * EDGE_CROP_RATIO))
    cropped = rgb.crop((inset, inset, rgb.width - inset, rgb.height - inset))

    draw = ImageDraw.Draw(cropped)
    frame_wipe = max(22, int(min(cropped.size) * 0.06))
    draw.rectangle((0, 0, cropped.width, frame_wipe), fill=(255, 255, 255))
    draw.rectangle((0, cropped.height - frame_wipe, cropped.width, cropped.height), fill=(255, 255, 255))
    draw.rectangle((0, 0, frame_wipe, cropped.height), fill=(255, 255, 255))
    draw.rectangle((cropped.width - frame_wipe, 0, cropped.width, cropped.height), fill=(255, 255, 255))

    x1 = int(cropped.width * LOGO_RECT[0])
    y1 = int(cropped.height * LOGO_RECT[1])
    x2 = int(cropped.width * LOGO_RECT[2])
    y2 = int(cropped.height * LOGO_RECT[3])
    draw.rounded_rectangle((x1, y1, x2, y2), radius=24, fill=(255, 255, 255))

    return cropped


def detect_subject_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    diff = ImageChops.difference(
        image,
        Image.new("RGB", image.size, (255, 255, 255)),
    ).convert("L")
    mask = diff.point(lambda value: 255 if value > TRIM_THRESHOLD else 0)
    bbox = mask.getbbox()
    if bbox is None:
        return (0, 0, image.width, image.height)
    return bbox


def expand_bbox(
    bbox: tuple[int, int, int, int],
    size: tuple[int, int],
    padding_ratio: float = PADDING_RATIO,
) -> tuple[int, int, int, int]:
    left, top, right, bottom = bbox
    width = right - left
    height = bottom - top
    pad_x = max(18, int(width * padding_ratio))
    pad_y = max(18, int(height * padding_ratio))

    return (
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(size[0], right + pad_x),
        min(size[1], bottom + pad_y),
    )


def build_canvas(cropped: Image.Image) -> Image.Image:
    resized = cropped.copy()
    resized.thumbnail(
        (
            int(CANVAS_SIZE[0] * MAX_FILL_RATIO),
            int(CANVAS_SIZE[1] * MAX_FILL_RATIO),
        ),
        Image.Resampling.LANCZOS,
    )
    resized = resized.filter(ImageFilter.UnsharpMask(radius=1.4, percent=110, threshold=2))

    canvas = Image.new("RGB", CANVAS_SIZE, (255, 255, 255))
    offset = (
        (CANVAS_SIZE[0] - resized.width) // 2,
        (CANVAS_SIZE[1] - resized.height) // 2,
    )
    canvas.paste(resized, offset)
    return canvas


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf"),
        Path("C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf"),
        Path("C:/Windows/Fonts/segoeui.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    return ImageFont.load_default()


def create_placeholder(brand: str, kind: str, accent: tuple[int, int, int]) -> Image.Image:
    canvas = Image.new("RGB", CANVAS_SIZE, (255, 255, 255))
    draw = ImageDraw.Draw(canvas)

    panel = (140, 110, CANVAS_SIZE[0] - 140, CANVAS_SIZE[1] - 120)
    draw.rounded_rectangle(panel, radius=56, fill=(248, 252, 255), outline=(230, 238, 248), width=4)

    heading_font = load_font(74)
    sub_font = load_font(30)

    if kind == "gallon":
        body = (520, 220, 890, 920)
        draw.rounded_rectangle(body, radius=170, fill=(239, 248, 255), outline=(accent[0], accent[1], accent[2]), width=6)
        neck = (625, 150, 785, 300)
        draw.rounded_rectangle(neck, radius=42, fill=(239, 248, 255), outline=(accent[0], accent[1], accent[2]), width=6)
        cap = (655, 115, 755, 165)
        draw.rounded_rectangle(cap, radius=16, fill=accent)
        label = (565, 470, 845, 625)
        draw.rounded_rectangle(label, radius=32, fill=accent)
        draw.text((603, 514), brand, fill=(255, 255, 255), font=load_font(50))
        subtitle = "Water Gallon"
    else:
        pack = (240, 350, 980, 760)
        draw.rounded_rectangle(pack, radius=42, fill=(251, 253, 255), outline=(accent[0], accent[1], accent[2]), width=6)
        draw.rounded_rectangle((480, 350, 710, 760), radius=30, fill=accent)
        bottle = (915, 300, 1115, 800)
        draw.rounded_rectangle(bottle, radius=92, fill=(245, 250, 255), outline=(accent[0], accent[1], accent[2]), width=6)
        draw.rounded_rectangle((955, 240, 1075, 340), radius=24, fill=(245, 250, 255), outline=(accent[0], accent[1], accent[2]), width=6)
        draw.rounded_rectangle((970, 210, 1060, 255), radius=14, fill=accent)
        draw.text((525, 495), brand, fill=(255, 255, 255), font=load_font(56))
        subtitle = "Product Image"

    title_bbox = draw.textbbox((0, 0), brand, font=heading_font)
    title_x = (CANVAS_SIZE[0] - (title_bbox[2] - title_bbox[0])) // 2
    draw.text((title_x, 860), brand, fill=(25, 36, 61), font=heading_font)

    sub_bbox = draw.textbbox((0, 0), subtitle, font=sub_font)
    sub_x = (CANVAS_SIZE[0] - (sub_bbox[2] - sub_bbox[0])) // 2
    draw.text((sub_x, 940), subtitle, fill=(120, 137, 160), font=sub_font)

    return canvas


def save_image(image: Image.Image, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    image.save(output_path, quality=92, optimize=True)


def parse_products() -> list[dict[str, str | int | float]]:
    text = DATA_FILE.read_text(encoding="utf-8")
    pattern = re.compile(
        r"id: '([^']+)'.*?"
        r"category: '([^']+)'.*?"
        r"size: '([^']+)'.*?"
        r"quantity: (\d+).*?"
        r"price: ([0-9.]+).*?"
        r"image: '/images/products_processed/([^']+)'",
        re.S,
    )

    products: list[dict[str, str | int | float]] = []
    for product_id, category, size, quantity, price, image_name in pattern.findall(text):
        products.append(
            {
                "id": product_id,
                "category": category,
                "size": size,
                "quantity": int(quantity),
                "price": float(price),
                "image_name": image_name,
            }
        )
    return products


def format_price(value: float) -> str:
    return f"SAR {int(value)}" if value.is_integer() else f"SAR {value:.2f}"


def format_category(value: str) -> str:
    return {
        "gallon": "Gallon",
        "offer": "Bundle",
        "glass": "Glass",
        "small": "Pack",
        "medium": "Pack",
        "large": "Pack",
    }.get(value, value.title())


def variant_accent(product_id: str) -> tuple[int, int, int]:
    total = sum(ord(char) for char in product_id)
    return ACCENT_COLORS[total % len(ACCENT_COLORS)]


def draw_chip(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    text: str,
    fill: tuple[int, int, int],
    text_fill: tuple[int, int, int],
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
) -> int:
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    width = (right - left) + 48
    height = (bottom - top) + 26
    draw.rounded_rectangle((x, y, x + width, y + height), radius=26, fill=fill)
    draw.text((x + 24, y + 13), text, fill=text_fill, font=font)
    return width


def create_product_variant(
    base_image: Image.Image,
    product: dict[str, str | int | float],
) -> Image.Image:
    variant = base_image.copy().convert("RGB")
    draw = ImageDraw.Draw(variant)
    accent = variant_accent(str(product["id"]))
    strong_font = load_font(34)
    light_font = load_font(30)

    size_text = str(product["size"]).replace("L", "L ").strip()
    if str(product["category"]) == "offer":
        size_text = "Special Offer"

    count_value = int(product["quantity"])
    count_text = f"x{count_value}" if count_value > 1 else format_category(str(product["category"]))
    price_text = format_price(float(product["price"]))

    base_y = CANVAS_SIZE[1] - 120
    start_x = 72
    chip1_w = draw_chip(draw, start_x, base_y, size_text, accent, (255, 255, 255), strong_font)
    chip2_w = draw_chip(draw, start_x + chip1_w + 16, base_y, count_text, (241, 245, 249), (51, 65, 85), light_font)
    draw_chip(draw, start_x + chip1_w + chip2_w + 32, base_y, price_text, (255, 255, 255), accent, light_font)
    return variant


def process_image(source_path: Path) -> Path | None:
    output_name = normalize_source_name(source_path)
    if output_name is None:
        return None

    with Image.open(source_path) as image:
        sanitized = remove_branding(image)
        bbox = detect_subject_bbox(sanitized)
        expanded = expand_bbox(bbox, sanitized.size)
        focused = sanitized.crop(expanded)
        canvas = build_canvas(focused)

    output_path = OUTPUT_DIR / output_name
    save_image(canvas, output_path)
    return output_path


def create_alias(alias_name: str, target_name: str) -> None:
    target_path = OUTPUT_DIR / target_name
    alias_path = OUTPUT_DIR / alias_name
    if not target_path.exists():
        raise FileNotFoundError(f"Missing alias target: {target_path}")
    alias_path.write_bytes(target_path.read_bytes())


def main() -> None:
    if not SOURCE_DIR.exists():
        raise SystemExit(f"Missing source directory: {SOURCE_DIR}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    processed = 0
    for image_path in sorted(SOURCE_DIR.iterdir()):
        if image_path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        if image_path.stem == "contact_sheet":
            continue

        if process_image(image_path):
            processed += 1

    for alias_name, target_name in ALIASES.items():
        create_alias(alias_name, target_name)

    for filename, meta in PLACEHOLDERS.items():
        placeholder = create_placeholder(meta["brand"], meta["kind"], meta["accent"])
        save_image(placeholder, OUTPUT_DIR / filename)

    products = parse_products()
    for product in products:
        base_path = OUTPUT_DIR / str(product["image_name"])
        if not base_path.exists():
            raise FileNotFoundError(f"Missing refined base image for {product['id']}: {base_path}")
        with Image.open(base_path) as base_image:
            variant = create_product_variant(base_image, product)
        save_image(variant, OUTPUT_DIR / f"{product['id']}.jpg")

    print(f"Generated {processed} refined images in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
