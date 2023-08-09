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