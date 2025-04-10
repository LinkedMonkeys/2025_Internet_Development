const allPara = document.querySelectorAll('p, a');
for (let i=0; i<allPara.length; i++) {
    allPara[i].textContent = allPara[i].textContent.replaceAll(/[A-Za-z]{6,}/g, 'chicken');
}