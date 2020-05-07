import { action, observable, decorate } from 'mobx'
import { createContext } from 'react'
import { fireApiService } from 'services/Dashboard'

class Dashboard {
    list = []

    fireApi = async (page, pageSize, tag) => {
        const res = await fireApiService(page, pageSize, tag)
        if (res.status === 200) {
            this.list = res.data.items
        }
    }   
}

const newDashboard = decorate(Dashboard, {
    fireApi: action,
    list: observable
})

export const DashboardStore = createContext(new newDashboard())