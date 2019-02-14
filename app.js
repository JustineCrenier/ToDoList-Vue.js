const app = new Vue({
	el: '#app',
	data:{
		title: 'ToDo List',
		newTask: '',
		tasks: []
	},
	methods:{
		addTask() {
			this.tasks.push({
				title: this.newTask,
				done: false
			});
			this.newTask='';
		},
		removeTask(task) {
			const index = this.tasks.indexOf(task);
			this.tasks.splice(index,1);
		}
	}
});