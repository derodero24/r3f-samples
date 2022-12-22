export const vertexShader = `
#define PI 3.141592653589793

// Buffer Geometry Attributes
// positionは無くても使える(?)
attribute vec4 color;
attribute vec3 rand;

// Fragment Shaderへの引き継ぎ用
varying vec4 v_color;

// Time in seconds since load
uniform float uTime;

void main() {
  // 引き継ぎ用変数にセット
  v_color = color;

  // ランダムな動きを追加
  float moveRange = 0.02;
  float randX = moveRange * sin(uTime * 3.0 + rand.x * PI);
  float randY = moveRange * sin(uTime * 3.0 + rand.y * PI);
  float randZ = moveRange * sin(uTime * 3.0 + rand.z * PI);
  vec3 randomizedPosition = position + vec3(randX, randY, randZ);

  // 位置・サイズ
  gl_Position = projectionMatrix * modelViewMatrix * vec4(randomizedPosition, 1.0 );
  gl_PointSize = 6.0;
}
`;

export const fragmentShader = `
precision mediump float; // 精度修飾子

void main() {
  // ■ → ●
  float dist = length(gl_PointCoord - vec2(0.5)); // 点の中心からの距離
  // <0.5->1, ≧0.5->0
  float alpha = 1. - step(0.5, dist);

  // 色セット
  gl_FragColor = vec4(vec3(0.5), alpha);
}
`;
