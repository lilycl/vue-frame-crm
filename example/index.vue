<template>
	<div>
		<t-frame :menu-list="menuList" :navs="navs" :count="count"></t-frame>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				menuList: [
          {
            name: "客户360视图",
            iconType: 'account-box',
            children: [{
              name: "基本视图",
              children: [{
                name: "客户基本信息",
                url: ""
              }, {
                name: "联系信息",
                url: ""
              }, {
                name: "社交网络信息",
                url: ""
              }]
            }, {
              name: "关系视图",
              children: [{
                name: "咨询&投诉记录",
                url: ""
              }, {
                name: "客户服务活动记录",
                url: ""
              }, {
                name: "地址信息",
                url: ""
              }, {
                name: "获客来源",
                url: ""
              }]
            }, {
              name: "业务视图",
              children: [{
                name: "业务概览",
                url: ""
              }, {
                name: "被保人信息",
                url: ""
              }, {
                name: "续保信息",
                url: ""
              }]
            }, {
              name: "客户洞察",
              children: [{
                name: "业务概览",
                url: ""
              }, {
                name: "被保人信息",
                url: ""
              }, {
                name: "续保信息",
                url: ""
              }]
            }, {
              name: "价值视图",
              children: [{
                name: "业务概览",
                url: ""
              }, {
                name: "被保人信息",
                url: ""
              }, {
                name: "续保信息",
                url: ""
              }]
            }, {
              name: "风险试图",
              children: [{
                name: "业务概览",
                url: ""
              }, {
                name: "被保人信息",
                url: ""
              }, {
                name: "续保信息",
                url: ""
              }]
            }, {
              name: "行为视图",
              children: [{
                name: "业务概览",
                url: ""
              }, {
                name: "被保人信息",
                url: ""
              }, {
                name: "续保信息",
                url: ""
              }]
            }]
          },
          {
            name: "客户管理",
            icon: "&#xe796;",
            iconType: 'account-box',
            children: [{
              name: "客户信息管理",
              children: [{
                name: "个人客户",
                url: "/client/customer"
              }, {
                name: "机构客户",
                url: "/client/company"
              }, {
                name: "查询列表",
                url: "/client/queryList"
              }, {
                name: "个人客户详细信息",
                url: "/client/customerDtl"
              }, {
                name: "机构客户信息详情",
                url: "/client/companyDtl"
              }, {
                name: "可信度打分",
                url: "/menu/clientInfo"
              }, {
                name: "审计追踪",
                url: "/menu/clientInfo"
              }, {
                name: "安全管控",
                url: "/menu/clientInfo"
              }]
            }]
          },
          {
            name: "客户洞察",
            icon: "&#xe786;",
            iconType: 'account-box',
            children: [{
              name: "综合表格",
              url: ""
            }, {
              name: "冻结列表格",
              url: ""
            }, {
              name: "可编辑表格",
              url: ""
            }, {
              name: "合并表格",
              url: ""
            }]
          },
          {
            name: "营销管理",
            icon: "&#xe785;",
            iconType: 'account-box',
            children: [{
              name: "表单一",
              url: ""
            }, {
              name: "表单二",
              url: ""
            }, {
              name: "高级搜索",
              url: ""
            }]
          },
          {
            name: "销售管理",
            icon: "&#xe789;",
            iconType: 'account-box',
            children: [{
              name: "组件",
              url: ""
            }]
          },
          {
            name: "服务管理",
            icon: "&#xe64f;",
            iconType: 'account-box',
            children: [{
              name: "客户咨询、投诉、理赔",
              url: ""
            }, {
              name: "客户回访",
              url: ""
            }, {
              name: "客户关怀",
              url: ""
            }, {
              name: "创新服务",
              url: ""
            }]
          },
          {
            name: "会员管理",
            icon: "&#xe787;",
            iconType: 'account-box',
            children: [{
              name: "活动管理",
              url: ""
            }]
          },
          {
            name: "渠道管理",
            icon: "&#xe78a;",
            iconType: 'account-box',
            children: [{
              name: "渠道整合",
              url: ""
            }, {
              name: "渠道协同",
              url: ""
            }, {
              name: "渠道持续优化",
              url: ""
            }]
          },
          {
            name: "知识库",
            icon: "&#xe64e;",
            iconType: 'account-box',
            children: [{
              name: "知识录入",
              url: ""
            }, {
              name: "知识应用",
              url: ""
            }, {
              name: "知识优化",
              url: ""
            }]
          },
          {
            name: "权限管理中心",
            icon: "&#xe788;",
            iconType: 'account-box',
            children :[{
              name: "功能管理",
              children:[{
                name:"实体操作行为绑定",
                url: "/uspaManage/uspa/entityPrivRelaManager"
              },{
                name:"操作员授权",
                url: "/uspaManage/uspa/operatorAuthorManager"
              },{
                name:"组织授权",
                url: "/uspaManage/uspa/organizeAuthorManager"
              },{
                name:"岗位类型授权",
                url:"/uspaManage/uspa/stationTypeAuthorManager"
              },{
                name:"实体与功能集绑定",
                url:"/uspaManage/uspa/roleEntityRelaManager"
              },{
                name:"菜单与功能集绑定",
                url:"/uspaManage/uspa/roleFunctionRelaManager"
              }]
            },{
              name:"组织架构管理",
              children:[{
                name:"岗位类型管理",
                url:"/uspaManage/uspa/stationTypeManager"
              },{
                name:"组织管理",
                url:"/uspaManage/uspa/organizeManager"
              },{
                name:"员工管理",
                url:"/uspaManage/uspa/operatorManager"
              },{
                name:"虚拟组管理",
                url:"/uspaManage/uspa/virtualGroupManager"
              },{
                name:"操作员上岗",
                url:"/uspaManage/uspa/opStationManager"
              },{
                name:"岗位管理",
                url:"/uspaManage/uspa/stationManager"
              }]
            },{
              name:"权限管理",
              children:[{
                name:"功能集互斥管理",
                url:"/uspaManage/uspa/roleExclude"
              },{
                name:"实体分类管理",
                url:"/uspaManage/uspa/entityClassManager"
              },{
                name:"菜单管理",
                url:"/uspaManage/uspa/functionManager"
              },{
                name:"功能集管理",
                url:"/uspaManage/uspa/roleManager"
              },{
                name:"实体管理",
                url:"/uspaManage/uspa/entityManager"
              },{
                name:"操作行为管理",
                url:"/uspaManage/uspa/privManager"
              }]
            }]
          }
        ],
        navs: [
          {
            type: 'icon',
            icon: 'bell'
          },
          {
            type: 'dropdown',
            icon: 'account-circle',
            children: [
              {
                name: 'icon1'
              },
              {
                name: 'icon2'
              },
              {
                name: 'icon3'
              }
            ]
          },
          {
            type: 'icon',
            icon: 'arrow-right-bold-box-outline'
          }
        ],
        count: 6
			}
		}
	}
</script>
