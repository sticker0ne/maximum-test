<template>
  <div class="wrapper">

    <!--Left arrow-->
    <div :class="arrowsClasses.leftArrow" @click="navigate('left-arrow')"
         class="button shadowed left-arrow noselect">
      <div class="text">← Назад</div>
    </div>

    <!--Numbers-->
    <div class="number-buttons noselect">
      <div :class="button.class"
           :key="key"
           @click="button.action"
           class="button shadowed"
           v-for="(button, key) in buttons">
        <div class="text">{{ button.title }}</div>
      </div>
    </div>

    <!--Right arrow-->
    <div :class="arrowsClasses.rightArrow" @click="navigate('right-arrow')"
         class="button shadowed right-arrow noselect">
      <div class="text">Вперед →</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginationBar',
  props: {
    itemsAmount: {type: Number, default: 1},
    itemsPerPage: {type: Number, default: 1},
    value: {type: Number, default: 1}
  },
  computed: {
    /**
       * Считает количество страниц
       * @returns {number} количество страниц
       */
    pageAmount () {
      let res = this.itemsAmount / this.itemsPerPage
      if (res - Math.round(res) > 0) return Math.round(res) + 1
      return Math.round(res)
    },
    /**
       * Считает классы отображения  стрелок
       * @returns {Object} объект классами
       */
    arrowsClasses () {
      let result = {leftArrow: 'disabled', rightArrow: 'disabled'}
      if (this.value > 1) result.leftArrow = 'enabled'
      if (this.value < this.pageAmount) result.rightArrow = 'enabled'

      return result
    },
    /**
       * Возвращает массив кнопок с настроенными классами и действиями
       * @returns {Array}
       */
    buttons () {
      let result = []

      for (let i = 1; i <= this.pageAmount; i++) {
        result.push({
          class: `number ${i === this.value ? 'selected' : ''}`,
          action: () => {
            this.navigate(i)
          },
          title: i.toString()
        })
      }

      return result
    }
  },
  methods: {
    /**
       * В зависимости от нажатой кнопки эмитит новое значение
       * @param value номер страницы (число) либо тип кнопки (строка)
       */
    navigate (value) {
      if (typeof value === 'number') {
        this.$emit('input', value)
        return
      }

      if (typeof value === 'string') {
        let hop = value.split('-')[0] === 'left' ? -1 : 1
        let resultValue = this.value + hop
        if (resultValue < 1 || resultValue > this.pageAmount) return

        this.$emit('input', resultValue)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/styles/colors";

  .wrapper {
    width: 100%;
    text-align: center;
  }

  .number-buttons {
    display: inline-block;
  }

  .button {
    cursor: pointer;
    display: inline-block;
    border-radius: 8px;
    background: $color-white;
    font-size: 26px;
    height: 60px;
    margin-right: 20px;

    .text {
      margin: 21px;
    }

    &.disabled, &.selected {
      cursor: default;
      color: $text-gray;
      background: $color-grey-light;
    }

    &.right-arrow {
      float: right;
    }

    &.left-arrow {
      float: left;
    }

    &:last-child {
      margin-right: 0;
    }
  }
</style>
