<script>
import Header from './components/Header.svelte';
import {darkmode} from './store/Store.js';
import Dashboard from './components/Dashboard.svelte';
import {onMount} from 'svelte';
import {v4} from 'uuid'
	let notes=[];
	let copyNotes=[...notes];
	
	$: count= notes.length;
	onMount(async ()=>{
		const response=await fetch('http://localhost:3000');
		const data= await response.json();
		notes=[...data.notes];
		copyNotes=[...notes];

		darkmode.set(data.settings.darkmode);

	})
	function handleNew(){
		const color= generateColor();
		const id=v4();
		const note={
			id:id,
			title:'',
			color:color,
			text:''
		};
		fetch('http://localhost:3000/add',{
			method:'POST',
			body:JSON.stringify(note),

			headers:{
				'Content-Type':'application/json; charset=utf-8'
			},
		
		}).then(response=>response.text()).
		then(res=>console.log(res));

		notes=[note,...notes];
		copyNotes=[...notes];
	}
	function generateColor(){
		const colors=['#DDFFC2','#FFC2C2','#FFEAC2','C2FFD3','C2FFEC','#C2FAFF','#C2E2FF','#CBC2FF','EBC2FF','#FFC2F7','#FFC2D8']
		const index= Math.floor(Math.random()*(colors.length))
		return colors[index];
	}
	function handleUpdate(e){
		const note= e.detail;
		const index= notes.findIndex(n=>n.id==note.id);
		fetch('http://localhost:3000/update',{
			method:'POST',
			body:JSON.stringify(note),
			headers:{
				'Content-Type':'application/json; charset=utf-8'
			},
		
		}).then(response=>response.text()).
		then(res=>console.log(res));
		notes[index] = note;
		copyNotes=[...notes];
	}
	function handleColor(e){
		const index= notes.findIndex(n=>n.id==e.detail.id);
		fetch('http://localhost:3000/update',{
			method:'POST',
			body:JSON.stringify(notes[index]),
			headers:{
				'Content-Type':'application/json; charset=utf-8'
			},
		
		}).then(response=>response.text()).
		then(res=>console.log(res));


		notes[index].color = generateColor();
		copyNotes[index].color = notes[index].color ;
	}
	function handleRemove(e){
		const response= notes.filter(n=>n.id!==e.detail.id);
		fetches('http://localhost:3000/remove',{
			method:'POST',
			body:JSON.stringify({id:e.detail.id}),
			headers:{
				'Content-Type':'application/json; charset=utf-8'
			},
		
		}).then(response=>response.text()).
		then(res=>console.log(res));
		notes=[...response]
		copyNotes=[...notes]
	}

	function handleSearch(e){
		const query=e.target.value;
		if(query==''){
			copyNotes=[...notes]
			return false;
		}
		const results=notes.filter(note=>{
			const title=note.title.toLowerCase();
			const text=note.text.toLowerCase();


			return title.indexOf(query) > -1|| text.indexOf(query) > -1;
		});
		copyNotes=[...results]
	}
</script>

<main class={$darkmode?'darkmode':''}>
	<Header on:input={handleSearch}/>
	<div class="count-notes">{count} Notas</div>
	<Dashboard bind:notes={copyNotes} on:click={handleNew} on:update={handleUpdate} on:color={handleColor} on:remove={handleRemove}/>
</main>

<style>
	main{
		height:100%;
	}
	:global(body){
		padding: 0;
		margin: 0;
		height:100%;
	}
	
	:global(main.darkmode, main.darkmode textarea, main.darkmode input){
		background-color: rgb(22, 22, 22);
		color: #fff;
	}
	
	.count-notes{
		padding: 20px 20px 0 20px;
		text-align: right;
	}
</style>