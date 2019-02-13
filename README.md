# Qu'est ce que Vue.js

![Logo de Vue.js](https://images.ecosia.org/dmskChbrW7WT8GCs5OPCg3_AhRA=/0x390/smart/https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1%2AOrjCKmou1jT4It5so5gvOA.jpeg)

Vue est un **framework évolutif** pour construire des interfaces utilisateur. À la différence des autres frameworks monolithiques, Vue a été conçu et pensé pour pouvoir être adopté de manière **incrémentale**.

## Comment installer Vue.js

**Soit via un script**:

version de développement
```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

version de production
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

**ou via npm**:

```console
$ npm install vue
```

## Créer une ToDo List avec Vue.js

### Démarrer l'application

La première chose à faire, est de construire notre fichier html avec le script et de créer une instance de Vue pour notre application.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo List avec Vue.js</title>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="app">
		<!-- notre code va venir ici -->
	</div>
	<!-- script -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="app.js"></script>
</body>
</html>
```
```javascript
const app = new Vue({
	el: '#app'
});
```

On lui dit ou rendre Vue grace à l'id app.

### Jouer avec les data

Rajouter des données et les afficher dans l'HTML

```javascript
const app = new Vue({
	el: '#app',
	//on rajoute l'objet data
	data: {
		title: 'ToDo List'
	}
});
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo List avec Vue.js</title>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="app">
		<!-- On appelle ici la donnée title -->
		<h1>{{title}}</h1>
	</div>
	<!-- script -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="app.js"></script>
</body>
</html>
```

### Gérer les évènements

Grace à Vue.js, on peut appeler directements des méthodes lors du clique d'un bouton ou d'une soumission de formulaire.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo List avec Vue.js</title>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="app">
		<h1>{{title}}</h1>
		<!-- Création d'un formulaire pour ajouter une tâche à la Todo list -->
		<form @submit.prevent="addTask">
			<input type="text" name="task" placeholder="votre tâche">
			<button type="submit">Ajouter</button>
		</form>
	</div>
	<!-- script -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="app.js"></script>
</body>
</html>
```

Le formulaire créer appelle au Submit `@submit`, une méthode appelée **addTask** que nous allons créer juste après. le `.prevent` permet au formulaire de ne pas adopter son comportement par défaut et donc ne pas recharger la page.

### Créer une méthode

Dans notre **app.js**, nous allons ajouter la méthode addTask pour que celle-ci s'ajoute à notre Todo List

```javascript
const app = new Vue({
	el: '#app',
	data: {
		title: 'ToDo List',
		// récupère la valeur de l'input au submit
		newTask: '',
		// Stock les taches dans un tableau
		tasks: []
	},
	//Nous créons l'objet methods
	methods: {
		//on ajoute notre function addTask
		addTask() {
			this.tasks.push({
				title: this.newTask,
				done: false
			});
			this.newTask = '';
		}
	}
});
```

Il faut modifier un peu notre html afin de le lier avec ce qu'il se passe dans nos données.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo List avec Vue.js</title>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="app">
		<h1>{{title}}</h1>
		<form @submit.prevent="addTask">
			<!-- v-model permet de lier l'input à la donnée newTask de notre app.js -->
			<input v-model="newTask" type="text" name="task" placeholder="votre tâche">
			<button type="submit">Ajouter</button>
		</form>

		<!-- Afficher les tâches dans une liste -->
		<ul>
			<!-- Vue.js nous permet grâce à v-for de boucler directement dans notre array tasks -->
			<li v-for="task in tasks">
				{{task.title}}
			</li>
		</ul>
	</div>
	<!-- script -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="app.js"></script>
</body>
</html>
```

### Bind et classe conditionnelle

Nous allons améliorer l'affichage de nos tâches en ajoutant une checkbox qui permettra de barrer la tâche et un bouton pour supprimer une tâche.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo List avec Vue.js</title>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="app">
		<h1>{{title}}</h1>
		<form @submit.prevent="addTask">
			<!-- v-model permet de lier l'input à la donnée newTask de notre app.js -->
			<input v-model="newTask" type="text" name="task" placeholder="votre tâche">
			<button type="submit">Ajouter</button>
		</form>


		<ul>
			<li v-for="task in tasks">
				<input type="checkbox" :name="task.title" :id="task.title" v-model="task.done">
				<label :for="task.title" :class="{done: task.done}">{{task.title}}</label>
				<button type="button">X</button>
			</li>
		</ul>
	</div>
	<!-- script -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="app.js"></script>
</body>
</html>
```

**:name, :id, :for**

On utilise les `:` pour pouvoir rendre les attributs dynamique avec du javascript.
c'est le raccourci de : `v-bind`

**v-model**

`v-model` permet de lier notre checkbox avec les données dans app.js et de mettre à jour l'état de notre tâche.

**:class**

On peut définir une classe dynamiquement avec une condition.

ici, la class `done` ne sera attribuée au label que si `task.done` est vrai.

### Une dernière méthode pour la route

On va ajouter un évènement au click sur la petite croix pour retirer la tâche de la liste.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>ToDo List avec Vue.js</title>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div id="app">
		<h1>{{title}}</h1>
		<form @submit.prevent="addTask">
			<input v-model="newTask" type="text" name="task" placeholder="votre tâche">
			<button type="submit">Ajouter</button>
		</form>


		<ul>
			<li v-for="task in tasks">
				<input type="checkbox" :name="task.title" :id="task.title" v-model="task.done">
				<label :for="task.title" :class="{done: task.done}">{{task.title}}</label>
				<!-- on ajoute un évènement au click qui appelle la méthode removeTask(task) -->
				<button @click="removeTask(task)" type="button">X</button>
			</li>
		</ul>
	</div>
	<!-- script -->
	<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	<script src="app.js"></script>
</body>
</html>
```
et on ajoute la méthode dans app.js

```javascript
const app = new Vue({
	el: '#app',
	data: {
		title: 'ToDo List',
		newTask: '',
		tasks: []
	},
	methods: {
		addTask() {
			this.tasks.push({
				title: this.newTask,
				done: false
			});
			this.newTask = '';
		},
		//function pour supprimer une tâche
		removeTask(task) {
			const taskIndex = this.tasks.indexOf(task);
			this.tasks.splice(taskIndex, 1);
		}
	}
});
```


### Bonus

Crée un bouton pour marquer toutes les tâches comme étant done.

Bon amusement !






