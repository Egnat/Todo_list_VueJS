const app = new Vue({
  el: '.component',
  data: {
    todos: [
     {
       name: 'Take a walk',
       done: true
     },
     {
       name: 'To eat',
       done: false
     },
     {
       name: 'Sleep',
       done: false
     }
    ],
    workingName: '',
    feedback: ''
  },
  methods: {
    add(event) {
      event.preventDefault();
      this.todos.push({
        name: this.workingName,
        done: false
      });
      this.feedback = `${this.workingName} added`;
      this.workingName = '';
    },
    remove(index, name) {
      this.todos.splice(index, 1);
      document.querySelector('.todos-label').focus();
      this.feedback = `${name} deleted`;
    }
  },
  computed: {
    validity() {
      return this.workingName.trim() === '';
    }
  }
});


//Функция для перетаскивания элемента Секция component мышкой на экране
const component = document.querySelector('.component');

// Отключаем дефолтный DnD
component.ondragstart = () => false;

// Функция для получение координат элемента
const getCoords = (elem) => {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

 /*Основной механизм DnD*/ 
// Этап 1. Вешаем обработчик на mousedown
component.addEventListener('mousedown', (e) => {
  // Этап 2. Вычисляем начальные координаты положения элемента
  const coords = getCoords(component);
  // console.log('coords', coords);
  const shiftX = e.pageX - coords.left;
  // console.log('shiftX', shiftX);
  const shiftY = e.pageY - coords.top;
  // console.log('shiftY', shiftY);
  
  // Этап 3. Подготовка к переносу
  // Создаем функцию для изменения стилей и перемещения элемента
  const moveAt = (e) => {
    component.style.left = e.pageX - shiftX + 'px';
    component.style.top = e.pageY - shiftY + 'px';
  }
  // Создаем функцию для удаления всех обработчиков
  const theEnd = () => {
    document.removeEventListener('mousemove', moveAt);
    document.removeEventListener('mouseup', theEnd);
  }

  // Чтобы перенос работал, делаем элемент absolute
  component.style.position = 'absolute';
  // Ставим первые значения переноса на точке нахождения элемента
  moveAt(e);
  component.style.zIndex = 1000; // делаем над другими элементами
  
  // Этап 4. Двигаем элемент.
  // При изменении положения мыши меняем координаты квадрата
  document.addEventListener('mousemove', moveAt);
  // Когда отпускаем мышь - все удаляем
  document.addEventListener('mouseup', theEnd);
});