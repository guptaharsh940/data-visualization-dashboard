import React from "react";
const NavBar=()=>{
    const currentUrl = window.location.pathname;
console.log(currentUrl);
    function ifactive(page){
        if((page==="home" && currentUrl==="/") || (page==="visualization" && currentUrl==="/visualization") || (page==="filters" && currentUrl==="/filters")){
            return "nav-link active";
        }
        else{
            return "nav-link";
        }
    }
    return(
        <nav className="navbar navbar-expand-lg bg-light justify-content-center">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{paddingLeft:"33vw"}}>
        <li className="nav-item">
          <a className={ifactive("home")} aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className={ifactive("visualization")}href="/visualization">Visualization</a>
        </li>
        <li className="nav-item">
          <a className={ifactive("filters")}href="/filters">Filters</a>
        </li>
        
      </ul>
      <form className="d-flex" role="search">
      </form>
    </div>
  </div>
</nav>
    )
}


export default NavBar;