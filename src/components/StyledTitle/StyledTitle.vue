<template>
	<div class="styled-title">
		<!-- <img class="title-icon" :src="iconUrl" mode="aspectFit"></img> -->
		<div class="title-text"><slot /></div>
	</div>
</template>

<script>
	export default {
		props: {
			iconUrl: String
		}
	}
</script>

<style lang="scss" scoped>
	.styled-title {
		height: 0.9375rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.1875rem;
		color: #41210F;
		position: relative;
		text-align: center;
		
		&:before {
			content: '';
			display: block;
			width: 4.90625rem;
			height: 0.46875rem;
			position: absolute;
			left: 0.40625rem;
			top: 50%;
			transform: translateY(-50%);
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAAAeCAMAAACL1iL6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTJOBdpOBdpSAdZOAdpSCdpWAdZOAeJOBdo+AcJOBdpOBdpKBd5KCdZOBdpOCd5KGeZKAdpOBdtkGhmUAAAASdFJOUwDg8ExQcDBAwBDq4Ut8/C0VVJKClbEAAACESURBVGje7dm7DoAgDEBRwCqKb/7/Yx1wkMREwQXJvWPHs7RJlaKHen8fMtBBB11tdLONaqB7TSfxaIAOOuigq5VuNKEVulQ6cx4lHXTQQVc+3SQiDrrcDauhgw466Cqmczq0QJdKdw066KAruL2N26D7EHQf6SylF946njKDDjroftQBbBF5siqVZdIAAAAASUVORK5CYII=');
			background-size: contain;
			background-repeat: no-repeat;
		}
		
		&:after {
			content: '';
			display: block;
			width: 4.90625rem;
			height: 0.46875rem;
			position: absolute;
			right: 0.40625rem;
			top: 50%;
			transform: translateY(-50%);
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAAAeCAMAAACL1iL6AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTJOBdpOBdpSAdZOAdpSCdpWAdZOAeJOBdo+AcJOBdpOBdpKBd5KCdZOCd5OBdpKAdpKGeZOBdunV65wAAAASdFJOUwDg8ExQcDBAwBDq4Ut8LfxUFWiYGwgAAACHSURBVGje7dm7DoAgDEBRwfrCt///sQ64YDQgg0n13pHxLG1osV3XFhQLOuigU0ZXNkEjdMl0Xfgk0EEHHXQfpZusr4fuKV19LCUWOuig00HnRGSALofOMGGhgw66H9DNxuegy1lO+K+DDjoFdGsVtiCTSkfQvUx3OutQUnfHRIoGHXTQKWoHo5N5srcazKcAAAAASUVORK5CYII=');
			background-size: contain;
			background-repeat: no-repeat;
		}
		
		.title-icon {
			width: 0.9375rem;
			height: 0.9375rem;
			margin-right: 0.40625rem;
		}
		
		.title-text {
			font-size: 1.1875rem;
			font-weight: 600;
		}
	}
</style>