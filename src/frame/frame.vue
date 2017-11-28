<template>
	<div class="layout layout--one-screen bg-gray-lightest-5">
		<div :class="['menu-backdrop d-xl-none',{'show': isOpenOnMinWin === false}]" @click="closeMenuOnMinWin"></div>
		<div :class="['layout-sidebar',{'layout-sidebar--folded': isOpen === false},{'show': isOpenOnMinWin === false}]">
			<div class="layout-logo-left">
				<slot name="frame-header">
					<span v-if="logoRouter">
						<router-link :to="logoRouter">
			        <img :src="img" alt="" class="layout-logo-img"/>
			        <img :src="imgMin" alt="" class="layout-logo-min-img"/>
		        </router-link>
					</span>
					<span v-else>
	        	<img :src="img" alt="" class="layout-logo-img"/>
						<img :src="imgMin" alt="" class="layout-logo-min-img"/>
					</span>
				</slot>
      	<a href="javascript:;" class="d-none d-xl-block thumb-icon" v-if="showMenu">
      		<t-icon type="menu" class="text-xxl text-black" @click.native="openOrClose" title="收起菜单"></t-icon>
      	</a>
      </div>
			<div :class="['layout-menu', {'menu--folded': isOpen === false}, {'menu--fold--show': clientWidth > 1200}]">
				<slot name="frame-menu">
					<t-menu
						type="light"
						:active-name="activeMenu"
            :open-position="openPosition"
            :accordion="accordion"
            :class="[{'menu--folded': isOpen === false && clientWidth > 1200}]"
            @on-select="hdMenuClick"
            ref="sidebarMenu">
							<template v-for="(item1, x) in menuList">
								<t-submenu :name="x" v-if="item1.children && item1.children.length">
									<template slot="title">
										<t-icon :type="item1.iconType"></t-icon>
						        <router-link :to="item1.path" v-if="item1.path">
				            	<span class="sub-text">{{item1.name}}</span>
						        </router-link>
						        <a :href="item1.link" target="_blank" v-else-if="item1.link">
						        	<span class="sub-text">{{item1.name}}</span>
						        </a>
						        <span class="sub-text" v-else>{{item1.name}}</span>
				          </template>
									<template v-for="(item2, y) in item1.children">
										<t-submenu v-if="item2.children && item2.children.length" :name="x + '' +y" class="second-submenu">
											<template slot="title">
					            	<router-link :to="item2.path" v-if="item2.path">
						            	<span class="sub-text">{{item2.name}}</span>
								        </router-link>
								        <a :href="item2.link" target="_blank" v-else-if="item2.link">
								        	<span class="sub-text">{{item2.name}}</span>
								        </a>
								        <span class="sub-text" v-else>{{item2.name}}</span>
					            </template>
					            <template v-for="(item3, z) in item2.children">
					            	<t-submenu v-if="item3.children && item3.children.length" :name="x + '' + y + '' + z" :id="x + '' +y" class="second-submenu">
					            		<t-menu-item v-for="(item4, w) in item3.children" :name="x + '' + y + '' + z + '' + w" :key="w" @click.native="getMenu(item4)" class="sec-item">
							            	<router-link :to="item4.path" v-if="item4.path">
								            	<span class="sub-text">{{item4.name}}</span>
										        </router-link>
										        <a :href="item4.link" target="_blank" v-else-if="item4.link">
										        	<span class="sub-text">{{item4.name}}</span>
										        </a>
										        <span class="sub-text" v-else>{{item4.name}}</span>
							            </t-menu-item>
					            	</t-submenu>
						            <t-menu-item :name="x + '' + y + '' + z" :key="z" @click.native="getMenu(item3)" class="sec-item" v-else>
						            	<router-link :to="item3.path" v-if="item3.path">
							            	<span class="sub-text">{{item3.name}}</span>
									        </router-link>
									        <a :href="item3.link" target="_blank" v-else-if="item3.link">
									        	<span class="sub-text">{{item3.name}}</span>
									        </a>
									        <span class="sub-text" v-else>{{item3.name}}</span>
						            </t-menu-item>
					            </template>
										</t-submenu>
										<t-menu-item :name="x + '' + y" v-else>
											<router-link :to="item2.path" v-if="item2.path">
					            	<span class="sub-text">{{item2.name}}</span>
							        </router-link>
							        <a :href="item2.link" target="_blank" v-else-if="item2.link">
							        	<span class="sub-text">{{item2.name}}</span>
							        </a>
							        <span class="sub-text" v-else>{{item2.name}}</span>
										</t-menu-item>
									</template>
								</t-submenu>
								<t-menu-item :name="x" v-else>
									<t-icon :type="item1.iconType"></t-icon>
									<router-link :to="item1.path" v-if="item1.path">
			            	<span class="sub-text">{{item1.name}}</span>
					        </router-link>
					        <a :href="item1.link" target="_blank" v-else-if="item1.link">
					        	<span class="sub-text">{{item1.name}}</span>
					        </a>
					        <span class="sub-text" v-else>{{item1.name}}</span>
								</t-menu-item>
							</template>
			    </t-menu>
				</slot>
			</div>
    </div>
    <div class="layout-content">
    	<div class="layout-nav navbar navbar-expand-lg bg-white align-items-center layout-nav--top">
				<div class="row nav-row">
					<div class="col col-6 nav-col">
						<a href="javascript:;" class="d-xm-block thumb-icon" v-show="!showMenu">
		      		<t-icon type="menu" class="text-xxl text-black" @click.native="openOrClose" title="收起菜单"></t-icon>
		      	</a>
				  	<slot name="frame-nav-left"></slot>
					</div>
					<div class="col col-6 nav-col nav-col--right">
		    		<slot name="frame-nav">
		    			<t-menu
								mode="horizontal"
								type="light"
								@on-select="handleNavSelect"
								class="menu-span"
		    			>
		    				<template v-for="(item, x) in navs">
		    					<t-submenu v-if="item.children" :name="x">
		    						<template slot="title">
											<t-icon :type="item.icon" v-if="item.icon"></t-icon>
											<span class="sub-text" v-if="item.name">{{item.name}}</span>
					          </template>
										<t-menu-item v-for="(item1, index) in item.children" :key="index + 'item'" :name="x + '' + index">
			    						<t-icon :type="item1.icon" v-if="item1.icon"></t-icon>
						        	<span class="sub-text" v-if="item1.name">{{item1.name}}</span>
			    					</t-menu-item>
		    					</t-submenu>
		    					<t-menu-item :name="x" v-else>
		    						<t-badge :count="count" state='danger' v-if="item.icon === 'bell' && count">
		    							<span @click="showSlipbox">
				    						<t-icon :type="item.icon" v-if="item.icon"></t-icon>
							        	<span class="sub-text" v-if="item.name">{{item.name}}</span>
						        	</span>
					        	</t-badge>
					        	<template v-else-if="item.icon === 'bell'">
					        		<span @click="showSlipbox">
						        		<t-icon :type="item.icon" v-if="item.icon"></t-icon>
							        	<span class="sub-text" v-if="item.name">{{item.name}}</span>
							        </span>
					        	</template>
					        	<template v-else>
					        		<t-icon :type="item.icon" v-if="item.icon"></t-icon>
							        <span class="sub-text" v-if="item.name">{{item.name}}</span>
					        	</template>
		    					</t-menu-item>
		    				</template>
		    			</t-menu>
		    		</slot>
					</div>
				</div>
    	</div>
    	<div class="slipbox__container" v-clickout-side="handleClickoutSide">
	    	<div class="slipbox__content" :class="[{'close': hideSlip}]">
	    		<div class="slipbox__close" @click="hideSlipbox">
	    			<a href="javascript:;" target="_self"><t-icon type="close"></t-icon></a>
	    		</div>
	    		<div class="slipbox__body">
	    			<slot name="slipbox-body">
			    		<t-tabs>
					      <t-tab-panel label="System Informs" name="tab-1">
							  <div class="notice-wrap" :class="{'notice-active': isActive === 0}" @click="handleNoticeClick(0)">
								  <span class="nw-l"><t-tag state='danger'>hot</t-tag></span>
								  <span class="nw-r">
									  <p class="nw-r-title">缴纳0元租赁使用高清电视机顶盒一台缴纳0元租赁使用高清电视机顶盒一台</p>
									  <p class="nw-r-time">有效周期：2017-09-09 至 2020-09-09</p>
								  </span>
							  </div>
							  <div class="notice-wrap" :class="{'notice-active': isActive === 1}" @click="handleNoticeClick(1)">
								  <span class="nw-l"><t-tag state='info'>info</t-tag></span>
								  <span class="nw-r">
									  <p class="nw-r-title">缴纳0元租赁使用高清电视机顶盒一台缴纳0元租赁使用高清电视机顶盒一台</p>
									  <p class="nw-r-time">有效周期：2017-09-09 至 2020-09-09</p>
								  </span>
							  </div>
							  <div class="notice-wrap" :class="{'notice-active': isActive === 2}" @click="handleNoticeClick(2)">
								  <span class="nw-l"><t-tag state='primary'>new</t-tag></span>
								  <span class="nw-r">
									  <p class="nw-r-title">缴纳0元租赁使用高清电视机顶盒一台缴纳0元租赁使用高清电视机顶盒一台</p>
									  <p class="nw-r-time">有效周期：2017-09-09 至 2020-09-09</p>
								  </span>
							  </div>
						  </t-tab-panel>
					    </t-tabs>
					  </slot>
	    		</div>
	    	</div>
    	</div>
    	<div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
	</div>
</template>
<script>
	import ClickoutSide from './clickoutside.js'
	export default {
		name: 'TFrame',
		props: {
			img: {
				type: String
			},
			imgMin: {
				type: String
			},
			// logo 路由
			logoRouter: {
				type: Object
			},
			// 当前展开的menu
			activeMenu: {
				type: [ String, Number ]
			},
			/**
			 * 渲染menu菜单
			 * {
			 * 	iconType, 一级菜单的右侧icon的type，对应的是aidesign的图标库
			 * 	name, 当前菜单的名称
			 * 	path, 路由的path对象
			 * 	link  非本项目的链接
			 * }
			 */
			menuList: {
				type: Array,
				default: []
			},
			/**
			 * 渲染头部menu
			 * {
			 * 	type, 'icon'| 'dropdown' | 'avatar'
			 * 	icon, 图标icon的type，对应的是aidesign的图标库
			 * 	children, 如果是dropdown时需要提供dropdownitem
			 * }
			 */
			navs: {
				type: Array,
				default: []
			},
			count: {
				type: Number
			}
		},
		data () {
			return {
				isOpen: true,
				isOpenOnMinWin: true,
				openPosition: 'down',
				clientWidth: 1200,
				showMenu: true,
				needBackDrop: false,
				hideSlip: true,
				accordion: true,
				isActive: 0
			}
		},
		directives: {
			ClickoutSide
		},
		methods: {
			handleNoticeClick (index) {
				this.isActive = index
			},
			closeMenuOnMinWin () {
				this.isOpenOnMinWin = true
			},
			openOrClose () {
				this.isOpen = !this.isOpen
				this.isOpenOnMinWin = false
				if (this.clientWidth >= 1200 && !this.isOpen) {
					this.openPosition = 'right'
				} else {
					this.openPosition = 'down'
				}

				if (this.clientWidth >= 1200 && !this.isOpen) {
					this.showMenu = false
				} else {
					this.showMenu = true
				}
			},
			hdMenuClick (name) {
				console.log('menu-click', name)
				this.$emit('menu-click', name)
			},
			handleNavSelect (name) {
				console.log('menu-nav-click', name)
				this.$emit('nav-menu-click', name)
			},
			getMenu (item) {
				this.$emit('on-click', item)
			},
			showSlipbox () {
				this.hideSlip = false
			},
			hideSlipbox () {
				this.hideSlip = true
			},
			_ischild (child) {
	      while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
	        if (child === this.$el) {
	          return true
	        }
	        child = child.parentNode
	      }
	      return false
	    },
	    _isChildNode (child, parent) {
	      while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
	        if (child === this.$el.getElementsByClassName(parent)[0]) {
	          return true
	        }
	        child = child.parentNode
	      }
	      return false
	    },
			handleClickoutSide (e) {
				if (this._ischild(e.target) && (!e.target.classList.contains('slipbox__content') || !this._isChildNode(e.target, 'slipbox__content'))) {
	        this.hideSlipbox()
	        return true
	      }
	      return false
			}
		},
		mounted () {
			let that = this
			let clientWidth = document.body.clientWidth || document.body.offsetWidth
			that.clientWidth = clientWidth
			if (this.clientWidth < 1200) {
				this.openPosition = 'down'
			}
			if (that.clientWidth >= 1200 && !that.isOpen) {
				that.showMenu = false
			} else {
				that.showMenu = true
			}
			window.addEventListener('resize', () => {
				let clientWidth = document.body.clientWidth || document.body.offsetWidth
				that.clientWidth = clientWidth
				if (that.clientWidth < 1200) {
					that.openPosition = 'down'
				}

				if (that.clientWidth >= 1200 && !that.isOpen) {
					that.showMenu = false
				} else {
					that.showMenu = true
				}
			})
		}
	}
</script>
<style lang="scss">
	@import './frame.scss'
</style>