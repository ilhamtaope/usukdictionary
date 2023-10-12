const content = document.getElementById("content");
const search = document.getElementById("search");

async function getData() {
  try {
    const response = await fetch("utils/data.json");
    if (!response.ok) {
      throw new Error("Fetch error");
    }

    const dataResponse = await response.json();
    dataResponse.forEach((element) => {
      content.innerHTML += `
      <li>
     <span>${element.ina}</span> <br> 
     <img src="/assets/ic_uk_small.png" alt="UK Flag">  ${element.uk} ${element.uk_sp} <br> 
     <img src="/assets/ic_us_small.png" alt="US Flag"> ${element.us} ${element.us_sp}
      </li>`;
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getData();

function searchData() {
  const searchValue = search.value.toLowerCase();
  const itemList = content.getElementsByTagName("li");

  console.log();
  let kataDitemukan = false;

  for (let i = 0; i < itemList.length; i++) {
    const element = itemList[i].textContent.toLowerCase();
    if (element.includes(searchValue)) {
      itemList[i].style.display = "block";
      kataDitemukan = true;
    } else {
      itemList[i].style.display = "none";
    }
  }
  const notFoundMessage = content.querySelector("p");

  if (!kataDitemukan) {
    if (!notFoundMessage) {
      const newNotFoundMessage = document.createElement("p");
      newNotFoundMessage.textContent = "Kata tidak ditemukan";
      content.appendChild(newNotFoundMessage);
    }
  } else if (notFoundMessage) {
    notFoundMessage.remove();
  }
}

search.addEventListener("input", searchData);
