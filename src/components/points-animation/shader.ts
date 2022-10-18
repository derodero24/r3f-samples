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
  gl_PointSize = 6.0;
}
`;

export const fragmentShader = `
precision mediump float; // 精度修飾子

void main() {
  // 点の中心からの距離を元に透明度を指定し、丸くする
  float alpha = 1. - smoothstep(0.4995, 0.5005, length(gl_PointCoord - vec2(0.5)));

  gl_FragColor = vec4(vec3(0.5), alpha);
}
`;
