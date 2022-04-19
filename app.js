'use strict';

/* Need:
  show three images
  25 selections
  total number of clicks and percentage of times the item was clicked [(click/total) *100]
*/

// Global variables
let selectionCount = 25;
let productArray = [];

// DOM references

let imgContainer = document.getElementById('container');
let imgOne = document.getElementById('image-one');
let imgTwo = document.getElementById('image-two');
let imgThree = document.getElementById('image-three');

let resultsList = document.getElementById('results-display');
let resultsBtn = document.getElementById('view-results-btn');


// Constructor Functions
function Product(name, fileExtension = 'jpg'){
  this.productName = name;
  this.img = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  
  productArray.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

console.log(productArray);
// Helper functions
function getRandomIndex(){
  // sourced from w3schools and lab demo
  return Math.floor(Math.random()*productArray.length);
}

// render images function
let renderImgArray = [];

function renderImg(){

  while(renderImgArray.length < 6) {
    let randomNumber = getRandomIndex();
    if(!renderImgArray.includes(randomNumber)){
      renderImgArray.push(randomNumber);
    }
  }

  let tempHolderOne = renderImgArray.shift();
  let tempHolderTwo = renderImgArray.shift();
  let tempHolderThree = renderImgArray.shift();

  imgOne.src = productArray[tempHolderOne].img;
  imgOne.alt = productArray[tempHolderOne].productName;
  productArray[tempHolderOne].views++;

  imgTwo.src = productArray[tempHolderTwo].img;
  imgTwo.alt = productArray[tempHolderTwo].productName;
  productArray[tempHolderTwo].views++;

  imgThree.src = productArray[tempHolderThree].img;
  imgThree.alt = productArray[tempHolderThree].productName;
  productArray[tempHolderThree].views++;
}

renderImg();

// event handlers
function handleClick(event){
  let imgClicked = event.target.alt;

  for(let i=0; i<productArray.length; i++){
    if(imgClicked === productArray[i].productName){
      productArray[i].clicks++;
    }
  }
  selectionCount--;

  if(selectionCount === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
  renderImg();
}

function showResults(){
  if(selectionCount === 0){
    for(let i=0; i<productArray.length; i++){
      let li = document.createElement('li');
      li.textContent = `${productArray[i].productName}: ${productArray[i].views} views, ${productArray[i].clicks} clicks, ${Math.round((productArray[i].clicks/productArray[i].views)*100) || 0}% vote per view`;
      resultsList.appendChild(li);
    }
  }
}

//event listeners
imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', showResults);
