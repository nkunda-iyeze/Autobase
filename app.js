import Corestore from 'corestore'
import Autobase from 'autobase'
// Create a new Corestore instance
const store = new Corestore('./my-storage-location') 

// Create a new Hypercore instance for input
let input = store.get({ name: 'input' })

// Create a new Autobase instance
let local = new Autobase(store, input.key, { apply, open })
await local.ready()

// Append a value to the local input
await local.append('local 0')

// Update the Autobase
await local.update()
await local.append('local 1')

// Log the inputs and outputs
for (let i = 0; i < local.view.length; i++) {
  console.log(await local.view.get(i))
}

// Create the view
async function open (store) {
  return store.get('test')
}

// Use apply to handle to updates
async function apply (nodes, view, base) {
  for (const { value } of nodes) {
    if (value.addWriter) {
      await base.addWriter(value.addWriter, { isIndexer: true })
      continue
    }

    //  await view.append(value)
  }  
}
// const clock = local.clock();
// console.log(await Autobase.isAutobase(store))
// console.log('clock', clock);)