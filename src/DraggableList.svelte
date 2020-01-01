<script>
import { onMount } from 'svelte'

export let count

let items = []
let selectedItemIdx = null
let clickY = null
let elem = null
let dragElem = null

onMount(async () => {
  items = [...Array(parseInt(count)).keys()].map(function(i) {
    return { itemId: i + 1, isSelected: false, yDrag: 0 }
  })
})

function handleMouseUp(ev) {
  for (var i = 0; i < items.length; i++) {
    items[i].isSelected = false
    items[i].yDrag = 0
  }
  dragElem.remove()
  dragElem = null
  selectedItemIdx = null
}

function handleMouseMove(ev) {
  if (selectedItemIdx !== null) {
    const dY = ev.clientY - clickY
    dragElem.style.transform = "translate(0, " + dY.toString(10) + "px)"
    dragElem.style.background = "red"
  }
}

function handleMouseDown (ev) {
  selectedItemIdx = [...this.parentElement.children].indexOf(this)
  items[selectedItemIdx].isSelected = true
  clickY = ev.clientY

  dragElem = this.cloneNode(true)
  console.log(dragElem)

  const oldStyle = window.getComputedStyle(this)
  const boundingRect = this.getBoundingClientRect()
  dragElem.style.position = "fixed"
  dragElem.style.margin = "0"
  dragElem.style.top = boundingRect.top.toString() + "px"
  dragElem.style.left = boundingRect.left.toString() + "px"
  dragElem.style.width = oldStyle.getPropertyValue('width')
  dragElem.style.height = oldStyle.getPropertyValue('height')
  dragElem.style.transitionDuration = "0s"

  const body = document.getElementsByTagName('body')[0]
  body.appendChild(dragElem)
}
</script>

<style>
  div {
    transition-duration: 0.2s;
    box-sizing: border-box;
    border: 1px solid black;
    margin: 1em 0;
    padding: 1em;
    user-select: none;
    background: white;
  }
  .selected {
    background: yellow;
  }
</style>


<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove} />

<section bind:this={elem}>
{#each items as item}
<div class:selected={item.isSelected} on:mousedown={handleMouseDown}>
   Card {item.itemId}
  </div>
{/each}
</section>
