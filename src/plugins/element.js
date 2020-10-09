import Vue from 'vue'

import ElementUI, { Button } from 'element-ui'
import { Form,FormItem } from 'element-ui'

import { Input } from 'element-ui'
import { Message } from 'element-ui'

import { Container } from 'element-ui'
import { Header } from 'element-ui'
import { Aside } from 'element-ui'
import { Main ,Option,Tag} from 'element-ui'
import { Menu,Submenu,MenuItemGroup,MenuItem ,Breadcrumb,BreadcrumbItem,
Card,Row,Select,Col,Table,TableColumn,Switch,Tooltip,Pagination,PageHeader,Dialog,Popover,MessageBox
} from 'element-ui'

Vue.use(Tag)
Vue.use(Option)
Vue.use(Select)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(PageHeader)

Vue.use(Tooltip)
Vue.use(Switch)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)

Vue.use(BreadcrumbItem)

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)

Vue.prototype.MessageBox=MessageBox

Vue.prototype.Message=Message;


