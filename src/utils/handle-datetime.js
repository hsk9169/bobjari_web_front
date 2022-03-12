export const compareDate = lastUpdated => {
    const now = new Date().toLocaleString().split('. ')
    const last = new Date(lastUpdated).toLocaleString().split('. ')

    let ret = null  
    for (let idx=0; idx < now.length; idx++) {
    	if (idx < 3 && 
            parseInt(last[idx]) < parseInt(now[idx])
        ) {
    		ret  = now[idx] - last[idx]
            ret += (idx === 0 ? '년 전' :
            		idx === 1 ? '달 전' :
                	    		'일 전')
            break
        } else {
            ret = last[idx].slice(0,-3)
        }
    }

    return ret
}