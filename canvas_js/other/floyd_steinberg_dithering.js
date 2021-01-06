canvas = document.getElementById('floyd_steinberg_dithering');

size = 500;
fsd = new ArtShip(size, size, canvas);
fsd.mouse_update();
context = fsd.context;
fsd.background(150, 150, 255);

function draw() {
    image = fsd.load_image('./cat.jpg')
    fsd.resize_canvas(500, 500);

    fsd.draw_image(image);

    pixel_image = fsd.pixel_image();
    pixels = fsd.pixels(pixel_image);
    bit = 1;
    for (let y = 0; y < fsd.height; y++ ) {
        for (let x = 0; x < fsd.width; x++) {
            i = fsd.index(x, y);

            avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
            pixels[i]     = avg; // red
            pixels[i + 1] = avg; // green
            pixels[i + 2] = avg; // fsdue

            old_colors = [
                pixels[i],
                pixels[i + 1],
                pixels[i + 2]
            ];

            new_colors = [
                fsd.round(bit * old_colors[0] / 255) * 255 / bit,
                fsd.round(bit * old_colors[1] / 255) * 255 / bit,
                fsd.round(bit * old_colors[2] / 255) * 255 / bit
            ];

            pixels[i + 0] = new_colors[0];
            pixels[i + 1] = new_colors[1];
            pixels[i + 2] = new_colors[2];

            error_colors = [
                old_colors[0] - new_colors[0],
                old_colors[0] - new_colors[0],
                old_colors[0] - new_colors[0]
            ];

            function colors_update(index, pixels, error_colors, error_coeff) {
                colors_to_update = [
                    pixels[index],
                    pixels[index + 1],
                    pixels[index + 2],
                ];

                updated_colors = [
                    colors_to_update[0] + error_colors[0] * error_coeff,
                    colors_to_update[1] + error_colors[1] * error_coeff,
                    colors_to_update[2] + error_colors[2] * error_coeff
                ];
                pixels[index] = updated_colors[0];
                pixels[index + 1] = updated_colors[1];
                pixels[index + 2] = updated_colors[2];

                return pixels;
            }

            pixels = colors_update(fsd.index(x + 1, y + 0), pixels, error_colors, 7 / 16);
            pixels = colors_update(fsd.index(x - 1, y + 1), pixels, error_colors, 3 / 16);
            pixels = colors_update(fsd.index(x + 0, y + 1), pixels, error_colors, 5 / 16);
            pixels = colors_update(fsd.index(x + 1, y + 1), pixels, error_colors, 1 / 16);

        }
    }
    fsd.pixel_to_vector(pixel_image);

    for (let x = 0; x <= fsd.width; x += fsd.ratio(10)) {
        let max_radius = fsd.remap(fsd.abs(x - fsd.width / 2), 0, fsd.width / 2, fsd.width / 2, 0);
        for (radius = max_radius; radius > 0; radius -= fsd.ratio(10)) {
            fsd.circle(x, fsd.height / 2, radius / 2);
            fsd.stroke(1, 255, 0, 0, 0.3);
        }
    }
    for (let x = 0; x <= fsd.width; x += fsd.ratio(10)) {
        for (radius = fsd.width / 2; radius > 0; radius -= fsd.ratio(10)) {
            fsd.circle(x, fsd.height / 2, radius);
            fsd.stroke(1, 0, 0, 0, 0.2);
        }
    }
}

draw();
