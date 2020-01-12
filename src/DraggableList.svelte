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

// taken from https://stackoverflow.com/a/19824266
function copyComputedStyle(from, to) {
  const computedStyle = from.currentStyle || document.defaultView.getComputedStyle(from, null)

  // check browser compatibility
  if (!computedStyle) return null
  function stylePropertyValid(name, value) {
    return typeof value !== 'undefined' &&
	   typeof value !== 'object' &&
	   typeof value !== 'function' &&
	   value.length > 0 &&
	   value != parseInt(value)
  }
  for (const property of computedStyle) {
    if (stylePropertyValid(property, computedStyle[property])) {
      to.style[property] = computedStyle[property]
    }
  }
}

function handleMouseUp(ev) {
  if (dragElem !== null) {
    for (var i = 0; i < items.length; i++) {
      items[i].isSelected = false
      items[i].yDrag = 0
    }
    dragElem.remove()
    dragElem = null
    selectedItemIdx = null
  }
}

function handleMouseMove(ev) {
  if (selectedItemIdx !== null) {
    var clientY = clickY
    if (ev.type == "mousemove") {
      clientY = ev.clientY
    } else if (ev.type == "touchmove") {
      clientY = ev.touches[0].clientY
    } else {
      console.log(ev)
    }

    if (clientY < 100 && window.scrollY > 0) {
      const speed = clientY - 100
      window.scroll(window.scrollX, window.scrollY + speed)
    } else if (clientY > (window.innerHeight - 100)) {
      const speed = clientY - window.innerHeight + 100
      window.scroll(window.scrollX, window.scrollY + speed)
    }

    const dY = clientY - clickY
    dragElem.style.transform = "translate(0, " + dY.toString(10) + "px)"

    var boundingBoxes = Array()
    for (const el of elem.children) {
      const boundingRect = el.getBoundingClientRect()
      const rect = {
        xmin: boundingRect.left,
        xmax: boundingRect.left + boundingRect.width,
        ymin: boundingRect.top,
        ymax: boundingRect.top + boundingRect.height,
      }
      boundingBoxes = [...boundingBoxes, rect]
    }

    var landingAfter = -1
    for (const bb of boundingBoxes) {
      if (ev.clientY > bb.ymin) {
        landingAfter += 1
      }
    }
    if (landingAfter == selectedItemIdx) {
      return
    }
    const tmp = items[selectedItemIdx]
    const n = items.length
    var newItems = [...items.slice(0, selectedItemIdx), ...items.slice(selectedItemIdx + 1, n)]
    if (landingAfter == -1) {
      items = [tmp, ...newItems]
      selectedItemIdx = 0
      return
    } else {
      items = [...newItems.slice(0, landingAfter), tmp, ...newItems.slice(landingAfter, n - 1)]
      selectedItemIdx = landingAfter
      return
    }
  }
}

function handleMouseDown (ev) {
  selectedItemIdx = [...this.parentElement.children].indexOf(this)
  items[selectedItemIdx].isSelected = true
  if (ev.type == "mousedown") {
    clickY = ev.clientY
  } else if (ev.type == "touchstart") {
    clickY = ev.touches[0].clientY
  } else {
    console.log(ev)
  }

  dragElem = this.cloneNode(true)
  copyComputedStyle(this, dragElem)

  const oldStyle = window.getComputedStyle(this)
  const boundingRect = this.getBoundingClientRect()
  dragElem.style.position = "fixed"
  dragElem.style.margin = "0"
  dragElem.style.top = boundingRect.top.toString() + "px"
  dragElem.style.left = boundingRect.left.toString() + "px"
  dragElem.style.width = oldStyle.getPropertyValue('width')
  dragElem.style.height = oldStyle.getPropertyValue('height')
  dragElem.style.boxShadow = "0px 4px 8px 0 rgba(0, 0, 0, 0.2)"
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
    opacity: 0.2;
  }
</style>


<svelte:window on:mouseup={handleMouseUp} on:mousemove={handleMouseMove}
               on:touchend={handleMouseUp} on:touchmove={handleMouseMove} />

<section bind:this={elem}>
{#each items as item}
<div class:selected={item.isSelected} on:mousedown={handleMouseDown} on:touchstart={handleMouseDown}>
   Card {item.itemId}
  </div>
{/each}
</section>
