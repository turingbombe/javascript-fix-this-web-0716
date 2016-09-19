var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    var service = serve.apply(this, ["Happy Eating!", this.customer])
    setTimeout(function() {
      updateFunction(service)
    }, 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

function makeCake() {
  var updateCakeStatus = function(statusText){
   document.getElementsByClassName("status")[0].innerText = statusText
  };
  mix.call(cake, updateCakeStatus)
}

function makePie() {
  var updatePieStatus = function(statusText){
   document.getElementsByClassName("status")[1].innerText = statusText
  };
  mix.call(pie, updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var bake_item = this
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(function() {
    cool.call(bake_item,updateFunction)
  }, 2000)
  updateFunction(status)
}

function mix(updateFunction) {
  var mix_item = this
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(function() {
    bake.call(mix_item,updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var cool_item = this.decorate.bind(this)
  var status = "It has to cool! Hands off!"
  setTimeout(cool_item(updateFunction), 2000)
  updateFunction(status)
}

function makeDessert() {
  if (this.innerHTML == "Make Pie"){
    pie.decorate = cake.decorate.bind(pie)
    makePie()
  } else if(this.innerHTML == "Make Cake"){
    makeCake()
  }
  //add code here to decide which make... function to call
  //based on which link was clicked
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
