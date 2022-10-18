export function normalRand() {
  // -1~1のランダム値生成
  return (Math.random() - 0.5) * 2;
}

export function to2dArray(array: number[], setSize: number) {
  // 2次元配列へ次元変更
  const reshaped = [];
  for (let i = 0; i < array.length; i += setSize) {
    reshaped.push(array.slice(i, i + setSize));
  }
  return reshaped;
}

export function randomChoise(array: number[] | number[][], size: number) {
  // 配列からランダム&重複なしで要素を抽出
  const shuffled = array.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, size);
  return selected;
}
