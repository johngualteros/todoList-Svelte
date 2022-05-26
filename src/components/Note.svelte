<script>
    import {darkmode} from '../store/Store.js';

    // import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
    export let title;
    export let color;
    export let text;
    export let id;

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    
    function handleChange(){
        dispatch('update',{
            id:id,
            text:text,
            color:color,
            title:title
        });
    }
    function handleColor(){
        dispatch('color',{
            id:id,
        });
    }
    function handleRemove(){
        dispatch('remove',{
            id:id,
        });
    }
</script>
<div class={$darkmode? 'Note-darkmode':'Note'}>
    <div class="note-container" style={$darkmode ? 'background-color:#232531': 'background-color:'+color}>
        <div class="header" style={$darkmode?'background-color:'+color:''}>
            <div class="options">
                <button on:click={handleColor}>
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M8 3C5.79 3 4 4.79 4 7V14C4 15.1 4.9 16 6 16H9V20C9 21.1 9.9 22 11 22H13C14.1 22 15 21.1 15 20V16H18C19.1 16 20 15.1 20 14V3H8M8 5H12V7H14V5H15V9H17V5H18V10H6V7C6 5.9 6.9 5 8 5M6 14V12H18V14H6Z" />
                    </svg>
                </button>
                <button  on:click={handleRemove}>
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M9.5 11H14.5C14.78 11 15 11.22 15 11.5V13H9V11.5C9 11.22 9.22 11 9.5 11M5 5V7H19V5H5Z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <input type="text" placeholder="Sin titulo..." bind:value={title} on:change={handleChange}>
            </div>
            <div class="text">
                <textarea type="text" placeholder="Escribir..." cols="30" rows="10" bind:value={text} on:change={handleChange}/>
            </div>
        </div>
    </div>
</div>
<style>
    .Note,.Note-darkmode{
        background-color:#fff;
        border-radius:3px;
        border:2px solid transparent;
        overflow:hidden;
        height:400px;
    }
    .note-container{
        height:100%;
    }
    .note-container:focus-within{
        border: 2px solid #000;
        box-shadow:0 2px 5px rgba(0,0,0,0.2);
    }
    .header{
        padding: 5px;
    }
    .options{
        display: flex;
        justify-content: space-between;
    }
    .content{
        padding: 0 20px;
    }
    .text textarea{
        width: 100%;
        border: 0;
        outline: none;
        resize: none;
        height: 250px;
    }
    .title input{
        font-size:22px;
        font-weight: bold;
        padding: 10px 0;
        outline: none;
        border: none;
        width: 100%;
    }
    button{
        margin: 0;
        border: none;
        background-color:transparent;
        cursor: pointer;
    }
    textarea,input{
        background:transparent;
    }
    button{
        color: rgba(0,0,0,0.3);
    }
    button:hover{
        color: black;
    }
</style>