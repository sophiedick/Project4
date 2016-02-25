angular
  .module('logging')
  .service('FlashMessage', FlashMessage);

function FlashMessage(){

  var self = this;

  self.message = "";

  self.flash = function(){
    console.log("getting message");
    var clone = angular.copy(self.message);
    self.message = "";
    return clone;

  }
}



