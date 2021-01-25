# Art Ship

This is just a cool repository where
you can see the process of creating **hybrid art**

---

### The works available for viewing could be found here:
- canvas_js/main.html (run the page via localhost)

```shell
python3 -m http.server
```

---

# ArtShip module
This module will help you to work
comfortably with graphics in *Canvas Api JavaScript*

Now you can find this module at **canvas_js/art_ship.js**

### Initialization

```javascript
let canvas = document.getElementById('canvas_name');
let img = new ArtShip(height, width, canvas);
```

### Functions

___

```javascript
ArtShip.print(message)
```

- Print message to console

___

```javascript
ArtShip.fill(red, green, blue, alpha)
```

- Fill the shape with the given color <br>
  
  *Default parameters*
    - red = 0
    - green = 0
    - blue = 0
    - alpha = 1

___

```javascript
ArtShip.background(red, green, blue, alpha)
```

- Fill the full canvas with the given color <br>
  
  *Default parameters*
  - red = 255
  - green = 255
  - blue = 255
  - alpha = 1

___

```javascript
ArtShip.stroke(size, red, green, blue, alpha)
```

- Stroke the shape <br>
  
  *Default parameters*
  - size = 1
  - red = 0
  - green = 0
  - blue = 0
  - alpha = 1

___

```javascript
ArtShip.line(start_x, start_y, end_x, end_y)
```

- Make a line shape from a (start_x, start_y) to the (end_x, end_y)

___

```javascript
ArtShip.circle(x, y, radius)
```

- Make a circle shape with a given radius and center at the (x, y)

___

```javascript
ArtShip.rect(center_x, center_y, width, height)
```

- Make a rectangle shape with a given width
  and height and center at the (center_x, center_y)

___

```javascript
ArtShip.polygon(coordinates)
```

- Make a polygon by coordinates in format ```[[x_1, y_1], ...]``` <br>
  
  *Default parameters*
  - coordinates = ```[[0, 0]]```

___

```javascript
ArtShip.curve(coordinates)
```

- Make a quadratic curve shape through given coordinates

___

```javascript
ArtShip.random(min_value, max_value)
```

- Returns a random float number from min_value to max_value

___

```javascript
ArtShip.int(number)
```

- Returns an integer number

___
```javascript
ArtShip.round(number)
```

- Returns a round number

___

```javascript
ArtShip.abs(number)
```

- Returns the absolute value of a number

___

```javascript
ArtShip.ratio(ratio)
```

- Returns a ratio of the minimum of width, height and ratio

___

```javascript
ArtShip.remap(value, min_value, max_value, new_min_value, new_max_value)
```

- Returns a remapped value from *min_value,
  max_value* to *new_min_value, new_max_value*

___

```javascript
ArtShip.load_image(path)
```

- returns the image object

___

```javascript
ArtShip.pixel_image()
```

- Returns a meta info of pixelated image

___

```javascript
ArtShip.pixels(pixel_image)
```

- Returns a pixelated image in 1D array format (red, green, blue, alpha)

**Formula** for working with 1D array like a 2D array:

```javascript
for (let x = 0; x < this.width; x++) {
  for (let y = 0; y < this.height; y++) {
      idnex = ArtShip.index(x, y);  // index = (x + y * this.width) * 4;
      pixel_impage[index + 0] = ...;  // red
      pixel_impage[index + 1] = ...;  // green
      pixel_impage[index + 2] = ...;  // blue
      pixel_impage[index + 3] = ...;  // alpha
  }
}
```

___

```javascript
ArtShip.index(x, y)
```

- returns the (x, y) coordinate of 1D array

___

```javascript
ArtShip.pixel_to_vector(pixel_image)
```

- Assigns to the context vector image

___

```javascript
ArtShip.draw_image(image, upper_left_corner_x,
        upper_left_corner_y, width, height)
```

- Draw image on the canvas with
  the upper left corner at the point (x, y) <br>
  
  *Default parameters*
  - upper_left_corner_x = 0
  - upper_left_corner_y = 0
  - width = image width
  - height = image height

___

```javascript
ArtShip.save_image()
```

- Save the image

___

```javascript
ArtShip.mouse_update()
```

- Add coordinates of mouse and pressed flag in ArtShip.mouse

___

```javascript
ArtShip.resize_canvas(width, height)()
```

- Resize canvas <br>
  
  *Default parameters*
  - width = canvas width
  - height = canvas height

---


# LeoBrush module
This module will help you to draw using brushes

Now you can find this module at **canvas_js/leo_brush.js**

### Initialization

```javascript
let canvas = document.getElementById('canvas_name');
let img = new ArtShip(height, width, canvas);
let brush = new LeoBrush(img)
```

### Functions

___

```javascript
LeoBrush.calligraphy(coordinates,
        red, green, blue, random_color);
```

- Make calligraphy stroke via given coordinates
  in a format: ```[[x_1, y_1], ...]```
  The ```random_color``` boolean parameter shifts
  each line in the stroke with a random offset

  *Default parameters*
  - red = 0
  - green = 0
  - blue = 0
  - random_color = false

___

```javascript
LeoBrush.one_back(coordinates, red, green, blue, random_color);
```

- Make one back stroke via given
  coordinates in a format: ```[[x_1, y_1], ...]```

  *Default parameters*
  - red = 0
  - green = 0
  - blue = 0
  - random_color = false
  
___

```javascript
LeoBrush.brush(coordinates, red, green, blue, random_color);
```

- Make usual brush stroke via
  given coordinates in a format: ```[[x_1, y_1], ...]```

  *Default parameters*
  - red = 0
  - green = 0
  - blue = 0
  - random_color = false
