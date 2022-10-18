export const vertexShader = `
// Buffer Geometry Attributes
// positionは無くても使える(?)
attribute vec4 color;

// Fragment Shaderへの引き継ぎ用
varying vec4 v_color;

void main() {
  // 引き継ぎ用変数にセット
  v_color = color;

  // 位置・サイズ
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
  gl_PointSize = 12.0;
}
`;

export const fragmentShader = `
precision mediump float; // 精度修飾子

// Vertex Shaderから引き継ぐ
varying vec4 v_color;

void main() {
  // ■ → ●
  vec2 temp = gl_PointCoord - vec2(0.5);
  float f = dot(temp, temp);
  if (f > 0.25 ) {
      discard;
  }

  // 色セット
  gl_FragColor = v_color;
}
`;
