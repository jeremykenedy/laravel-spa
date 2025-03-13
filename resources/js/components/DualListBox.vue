<template>
  <div class="container">
    <div>
      <h2>{{ props.leftLabel }}</h2>
      <select class="form-select" multiple v-model="leftSelectedData" @dblclick="moveRight">
        <option v-for="(item, index) in props.leftData" :value="item" :key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>

    <div class="middle">
      <button class="btn btn-primary" @click.prevent="moveRight">=&gt;</button>
      <button class="btn btn-primary" @click.prevent="moveLeft">&lt;=</button>
    </div>

    <div>
      <h2>{{ props.rightLabel }}</h2>
      <select class="form-select" multiple v-model="rightSelectedData" @dblclick="moveLeft">
        <option v-for="(item, index) in props.rightData" :value="item" :key="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
let leftSelectedData = []
let rightSelectedData = []
const emit = defineEmits(['onChangeList'])
const props = defineProps({
  leftLabel: {
    type: String,
    required: true
  },
  rightLabel: {
    type: String,
    required: true
  },
  leftData: {
    type: Array,
    required: true
  },
  rightData: {
    type: Array,
    required: true
  }
})

function moveLeft() {
  if (!rightSelectedData.length) return;
  for (let i = rightSelectedData.length; i > 0; i--) {
    let idx = props.rightData.indexOf(rightSelectedData[i - 1]);
    props.rightData.splice(idx, 1);
    props.leftData.push(rightSelectedData[i - 1]);
    rightSelectedData.pop();
  }
  let leftData = props.leftData
  let rightData = props.rightData
  emit("onChangeList", {
    leftData,
    rightData
  });
}

function moveRight() {
  if (!leftSelectedData.length) return;
  for (let i = leftSelectedData.length; i > 0; i--) {
    let idx = props.leftData.indexOf(leftSelectedData[i - 1]);
    props.leftData.splice(idx, 1);
    props.rightData.push(leftSelectedData[i - 1]);
    leftSelectedData.pop();
  }
  let leftData = props.leftData
  let rightData = props.rightData
  emit("onChangeList", {
    leftData,
    rightData
  })
}


</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: grid;
  grid-template-columns: 30% 10% 30%;
  align-items: center;
}

.container select {
  height: 200px;
  width: 100%;
}

.container .middle {
  text-align: center;
}

.container button {
  width: 80%;
  margin-bottom: 5px;
}
</style>
