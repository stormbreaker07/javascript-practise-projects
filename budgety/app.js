

//budgetControlller
var budgetController = (function() {

      var expense = function(id,description,value)
      {
          this.id = id;
          this.description = description;
          this.value = value;
      };

      var income = function(id,description,value)
      {
          this.id = id;
          this.description = description;
          this.value = value;
      };

      var data = {
          allItems: {
              exp: [],
              inc: []
          },  
          total: {
              exp: 0,
              inc: 0
          }
        }


        return {
            additem: function(type , descrip , val) {
                var newitem , id ;

                //created an id and a new element 
                //and then push it in to array of ots type
            
                if(data.allItems[type].length >0)
                {
                    id = data.allItems[type][data.allItems[type].length - 1].id + 1;
                }
                else
                {
                    id = 0;
                }
                
               
                if(type === 'exp')
                {
                    newitem = new expense(id , descrip , val);
                }

                else if( type === 'inc')
                {
                    newitem = new income(id , descrip , val);
                }

                data.allItems[type].push(newitem);
            
                return newitem;
            },

            test: function() {
                console.log(data);
            }
            
        }

})();




//UI ocntroller
var UIController = (function() {

    var DOMstring = {
        inputType : '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expencescontainer: '.expenses__list'
    }
   return {
        getinput: function() {
            return {
                type: document.querySelector(DOMstring.inputType).value,
                description: document.querySelector(DOMstring.inputDescription).value,
                value: document.querySelector(DOMstring.inputValue).value
            };
        },
              
        addInList: function(obj , type) {
            var html ,newhtml , element;
            if(type === 'inc')
            {
                element = DOMstring.incomeContainer;

               html =  '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if(type === 'exp')
            {
                element = DOMstring.expencescontainer;

              html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newhtml = html.replace('%id%' , obj.id);
            newhtml = newhtml.replace('%description%' , obj.description);
            // console.log(obj.value);
            newhtml = newhtml.replace('%value%' , obj.value);
            
            document.querySelector(element).insertAdjacentHTML('beforeend' , newhtml);
        },

        getDOMstrings: function() {
            return DOMstring;
        }
   };

})();






var controller = ( function(budgetCntr ,UIcntr ) {

    var newEventListner = function() {

        var DOM = UIcntr.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click' , ctrlAddItem); 

  document.addEventListener('keypress' , function(event) {

    if( event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
    }
  });
    }    


    var ctrlAddItem = function() {
        
        //get input from user interface
        var input = UIcntr.getinput();
        
        var addItem = budgetCntr.additem(input.type , input.description , input.value);
        console.log(addItem.value);

        UIcntr.addInList(addItem , input.type);
    };



    return {
        init: function() {
        newEventListner(); 
        console.log('eventCall');
        }
    }
 

})(budgetController , UIController);


controller.init();
