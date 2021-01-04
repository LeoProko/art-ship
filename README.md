# Art Ship

This is just a cool repository where you can see the process of creating **hybrid art**

---

### The works available for viewing could be found here:
- p5_js/main_page.html
- canvas_js/draft_of_canvas_js/index.html

---

### **ArtShip** module
This module will help you to work comfortably with graphics in *Canvas Api JavaScript*

Now you can find this module at **canvas_js/draft_of_canvas_js/art_ship.js**

**Initialization**

```javascript
canvas = document.getElementById('canvas_name');
name = new ArtShip(height, width, canvas);
```

**Functions**

```javascript
ArtShip.print(message)
```
- Print message to console


```javascript
ArtShip.fill(red, green, blue, alpha)
```
- Fill the shape with the given color <br>
  *Default parameters*
    - red = 0
    - green = 0
    - blue = 0
    - alpha = 1

```javascript
ArtShip.background(red, green, blue, alpha)
```
- Fill the full canvas with the given color <br>
  *Default parameters*
  - red = 255
  - green = 255
  - blue = 255
  - alpha = 1

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
    
```javascript
ArtShip.line(start_x, start_y, end_x, end_y)

```
- Make a line shape from a (start_x, start_y) to the (end_x, end_y)

```javascript
ArtShip.circle(x, y, radius)
```
- Make a circle shape with a given radius and center at the (x, y)

```javascript
ArtShip.rect(center_x, center_y, width, height)
```
- Make a rectangle shape with a given width and height and center at the (center_x, center_y)

```javascript
ArtShip.curve(coordinates)
```
- Make a quadratic curve shape through given coordinates

```javascript
ArtShip.random(min_value, max_value)
```
- Returns a random float number from min_value to max_value

```javascript
ArtShip.int(number)
```
- Returns an integer number

```javascript
ArtShip.abs(number)
```
- Returns the absolute value of a number

```javascript
ArtShip.ratio(ratio)
```
- Returns a ratio of the minimum of width, height and ratio

```javascript
ArtShip.remap(value, min_value, max_value, new_min_value, new_max_value)
```
- Returns a remapped value from *min_value, max_value* to *new_min_value, new_max_value*

```javascript
ArtShip.return_pixel_image()
```
- Returns a pixelated image in 1D array format (red, green, blue, alpha)

**Formula** for working with 1D array like a 2D array:
```javascript
for (let x = 0; x < this.width; x++) {
  for (let y = 0; y < this.height; y++) {
      index = x + y * this.width;
      pixel_impage[index] = ...;
  }
}
```


```javascript
ArtShip.image_pixel_to_vector(pixel_image)
```
- Assigns to the context vector image
