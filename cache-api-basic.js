

const startCache = async ()=>{
    const name = 'cacheOne'
    const openCache = await caches.open(name);
    console.log("Opening cache", openCache)
    // One Approach
    let staticFileUrl = '/img/tech1.jpg?id=one';
    // openCache.add(staticFileUrl) // add = fetch + put

    // Two Approach

    let url = new URL('http://127.0.0.1:5500/img/tech2.jpg?id=two')
    // openCache.add(url);

    // Three Approach
    let req = new Request('https://jsonplaceholder.typicode.com/posts');
    // openCache.add(req)


    // cache keys ======================

    let key = await openCache.keys()
    //console.log(key)
    key.forEach((key, ind)=>{
        console.log("cache at Begining",key, ind)
    })
    // =================================

    // cache Exist or Not =========================================
    let hasOrNot = await caches.has('cacheOne')
    if(hasOrNot){
        console.log("cache has", hasOrNot)
        //startCache()


        // cache match
        let jsonplaceholderApi = "https://jsonplaceholder.typicode.com/users";
        let resOfApi = await caches.match(jsonplaceholderApi)
        
        if(resOfApi){
            console.log("resource found in cache")
            console.log("res api",await resOfApi.json())
        }else{
            console.log("resource not found")
            let doFetch = await fetch(jsonplaceholderApi)
            console.log("fetch res", doFetch)
            //let newCache = await caches.open('cacheTwo')
            openCache.put(jsonplaceholderApi, doFetch.clone())
            let cacheStatus = await openCache.keys();
            cacheStatus.forEach((val,ind)=>{
                console.log("cache at Final",val, ind)
            })
        }

    }  

    

}



startCache()





