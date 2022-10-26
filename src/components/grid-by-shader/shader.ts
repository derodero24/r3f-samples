export const vertexShader = `
uniform float clock;
varying vec3 v_position;

void main() {
  v_position = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
}
`;

export const fragmentShader = `
precision mediump float; // 精度修飾子

varying vec3 v_position;

uniform float tileWidth;
uniform float lineWidth;

float condition(float pos) {
  // ライン上のみ1, それ以外は0をリターン
  float n = floor(pos / tileWidth);
  float lineCenter = (2. * n + 1.) / 2. * tileWidth;
  float flag1 = step(lineCenter - lineWidth/2., pos);
  float flag2 = step(pos, lineCenter + lineWidth/2.);
  return flag1 * flag2;
}

void main() {
  float alpha = condition(abs(v_position.x)) + condition(abs(v_position.y));
  gl_FragColor = vec4(vec3(0.8), alpha);
}
`;
