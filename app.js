
/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let affection = 5
let mood = ""
let defaultAffection = 5
let maxKittens = 5

//functions

function addKitten(event) {
  event.preventDefault()
let form = event.target

if (kittens.length >= maxKittens){
  alert("Please kill your kittens to have another one")
}
else if (form.name.value == ""){
  alert("You must enter a name")
}
else {
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: defaultAffection,
  }
  kittens.push(kitten)
  saveKittens()

  form.reset()
  drawKittens()
  }

}

function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

function loadKittens() {
  let kittenData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittenData){
    kittens = kittenData
  }
}

function drawKittens() {
  loadKittens()
  
  let kittenElem = document.getElementById("moody-kittens")
  let kittensTemplate = ""

  kittens.forEach(kitten => {kittensTemplate +=`
  <div class="kitten-border bg-dark kitten ${kitten.mood} text-light">
    <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150">
    <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
    <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
    <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
    <div class="d-flex space-between"></div>
    <button class="btn-cancel m-1" onclick="pet('${kitten.id}')">Pet kitty</button>
    <button class="m-1" onclick="catnip('${kitten.id}')">Catnip</button>
    <div class="d-flex justify-content-center"><i class="action fa fa-trash text-danger" onclick="removeKitten('${kitten.id}')"></i></div>
    </div>
  </div>
  `
  })

  kittenElem.innerHTML = kittensTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let randomNumber = Math.random()
  
  if (randomNumber > .7) {
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens()
  }
  else {
    currentKitten.affection --;
    setKittenMood(currentKitten)
    saveKittens()
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("moody-kittens").classList.remove(kitten.mood)

  if (kitten.affection >= 6) {
    kitten.mood = "happy"
  }
  if (kitten.affection <= 5) {
    kitten.mood = "tolerant"
  }
  if (kitten.affection <= 3) {
    kitten.mood = "angry"
  }
  if (kitten.affection <= 0) {
    kitten.mood = "gone"
  }

  document.getElementById("moody-kittens").classList.add(kitten.mood)
  saveKittens()
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("add-div").classList.remove("hidden")
  drawKittens()
}

function deleteKittens() {
  kittens = []
  saveKittens()
  location.reload()
}

function delKittensButton(){
  loadKittens()
  if (kittens.length >= 1){
    document.getElementById("delKittens").classList.remove("hidden")
  }
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function removeKitten(id) {
  console.log(id)
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error("Invalid ID")
  }
  kittens.splice(index, 1)
  saveKittens()
}

delKittensButton()