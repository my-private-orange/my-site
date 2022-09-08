<template>
  <button :class="['styled-button', darker ? 'darker' : '']"><slot /></button>
</template>

<script>
export default {
  emits: [],
  props: {
    darker: Boolean,
  },
  options: {
    styleIsolation: 'shared',
    virtualHost: true,
    addGlobalClass: true,
  },
};
</script>

<style lang="scss" scoped>
.styled-button {
  width: 11rem;
  height: 2.625rem;
  line-height: 2.625rem;
  font-size: 1.125rem;
  background-image: url(/skongmiao/styled-button.png);
  background-size: 100% 92%;
  background-repeat: no-repeat;
  color: #ffffff;
  background-color: transparent;
  border: none;
  box-shadow: none;
  text-align: center;
  padding-right: 12%;
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    border: none;
  }

  &:active {
    transform: scale(0.96);
    transition: 0.2s all;
  }

  &.darker {
    background-image: url(/skongmiao/styled-button-dark.png);
  }
}
</style>
