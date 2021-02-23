import cv2
from datetime import datetime
import matplotlib.pyplot as plt
import numpy as np
from perlin_noise import PerlinNoise
import sys

if len(sys.argv) <= 1:
    print("[error] no input image")
    sys.exit()

path = sys.argv[1]
image = cv2.imread(path)
height = image.shape[0]
width = image.shape[1]
depth = image.shape[2]

noise0 = PerlinNoise(octaves=5, seed=np.random.randint(1, 100))
noise1 = PerlinNoise(octaves=10, seed=np.random.randint(1, 100))
noise2 = PerlinNoise(octaves=20, seed=np.random.randint(1, 100))
noise3 = PerlinNoise(octaves=30, seed=np.random.randint(1, 100))
noise4 = PerlinNoise(octaves=40, seed=np.random.randint(1, 100))

noise_width, noise_height = width // 15, height // 15
perlin_noise = []
for x in range(noise_width):
    row = []
    for y in range(noise_height):
        noise_val  = 1.0  * noise0([x / noise_width, y / noise_height])
        noise_val += 0.8  * noise1([x / noise_width, y / noise_height])
        noise_val += 0.6  * noise2([x / noise_width, y / noise_height])
        noise_val += 0.4  * noise3([x / noise_width, y / noise_height])
        noise_val += 0.2  * noise4([x / noise_width, y / noise_height])
        row.append(noise_val)
    perlin_noise.append(row)

perlin_noise = np.array(perlin_noise)
min_value_ratio = 15
perlin_noise = (perlin_noise + abs(perlin_noise.min())) / (perlin_noise.max() + abs(perlin_noise.min()))
perlin_noise = (perlin_noise + min_value_ratio) / (min_value_ratio + 1)
perlin_noise = cv2.resize(perlin_noise, (width, height))

for color_num in range(3):
    image[:,:,color_num] = image[:,:,color_num] * perlin_noise

min_value_ratio = 15
random_noise = np.random.rand(height, width, depth)
random_noise = (random_noise + min_value_ratio) / (min_value_ratio + 1)
image = image * random_noise
image = image.astype('uint8')

output_path = 'images/processed/'
if len(sys.argv) > 2:
    output_path = sys.argv[2]
else:
    now = datetime.now()
    dt_string = now.strftime("%d_%m_%Y_%H_%M_%S")
    output_path += 'processed_' + dt_string + '.png'

cv2.imwrite(output_path, image)
print("saved successful")
