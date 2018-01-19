function Person(fullName, favColor) {
    this.name = fullName, 
    this.color = favColor, 
    this.greet = function(){
        console.log('Hi my name is ' + name + ' and my favorite color is ' + color + '.');
    }
}

module.exports = Person;