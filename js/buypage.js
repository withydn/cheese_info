const section = document.querySelector("section");
const icecreams = [
  "내가 아인슈페너?!",
  "엄마는 외계인",
  "민트 초콜릿 칩",
  "뉴욕 치즈케이크",
  "아이스 초당옥수수",
  "초콜릿 무스",
  "체리쥬빌레",
  "뮤! 넌 내거야",
  "오레오 쿠키 앤 크림",
];
for (let i = 0; i < icecreams.length; i++) {
  const img = document.createElement("img");
  img.setAttribute("src", `./image/icecream${i + 1}.png`);
  img.classList.add("img-box");
  const topN = document.createElement("h3");
  topN.textContent = `Top${i + 1}`;
  topN.classList.add("text-center");
  const name = document.createElement("div");
  name.textContent = icecreams[i];
  name.classList.add("text-center");
  const article = document.createElement("article");
  article.classList.add("article-box");
  article.append(img);
  article.append(topN);
  article.append(name);
  section.append(article);
}
