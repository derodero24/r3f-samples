export const vertexShader = `
// Buffer Geometry Attributes
// positionは無くても使える(?)
attribute vec3 color;
attribute float alpha;

// Fragment Shaderへの引き継ぎ用
varying vec3 v_color;
varying float v_alpla;

void main() {
  v_color = color;
  v_alpla = alpha;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
  gl_PointSize = 12.0;
}
`;

export const fragmentShader = `
precision mediump float; // 精度修飾子

// Vertex Shaderから引き継ぐ
varying vec3 v_color;
varying float v_alpla;

void main() {
  vec2 temp = gl_PointCoord - vec2(0.5);
  float f = dot(temp, temp);
  if (f > 0.25 ) {
      discard;
  }

  gl_FragColor = vec4(v_color, v_alpla);
}
`;
