const keyboards = {
    left_top_lis:[
        {name:'%',type:'o'},
        {name:'C',type:'reset'},
        {name:'←',type:'back'}
    ],
    left_main_lis:[
        {name:'7',type:'number'},
        {name:'8',type:'number'},
        {name:'9',type:'number'},
        {name:'4',type:'number'},
        {name:'5',type:'number'},
        {name:'6',type:'number'},
        {name:'1',type:'number'},
        {name:'2',type:'number'},
        {name:'3',type:'number'},
        {name:'±',type:'pos'},
        {name:'0',type:'number'},
        {name:'.',type:'number'},
    ],
    right_lis:[
        {name:'/',type:'o'},
        {name:'*',type:'o'},
        {name:'-',type:'o'},
        {name:'+',type:'o'},
        {name:'=',type:'equal'},
    ]
}
class Header extends  React.Component {
    render(){
        let {express,eq} = this.props;
        return (
            <header>
            <input type="text" readOnly name="caculate" value={express}/>
        <input type="text" readOnly name="result" value={eq}/>
        </header>
    )
    }
}
class Content extends React.Component {
    render(){
        let {right_lis,left_top_lis,left_main_lis} = keyboards;
        let {fn} = this.props;
        right_lis = right_lis.map(v=>(<li key={v.name} onClick={()=>fn(v)}>{v.name}</li>))
        left_top_lis = left_top_lis.map(v=>(<li key={v.name} onClick={()=>fn(v)}>{v.name}</li>))
        left_main_lis = left_main_lis.map(v=>(<li key={v.name} onClick={()=>{fn(v)}}>{v.name}</li>))
        return (
            <main>
            <ul className="left">
            <li>
            <ul>
            {left_top_lis}
            </ul>
            </li>
        {left_main_lis}
    </ul>
        <ul className="right">
            {right_lis}
            </ul>
            </main>
    )
    }
}

class Computer extends React.Component {
    constructor(){
        super();
        this.state = {
            express:'',
            eq:''
        }
        this.fn = this.fn.bind(this)
    }
    fn(v){
        var reg=/^[+-]?\d+(\.?\d{0,2})([%+*/-]?\d+(\.?\d{0,2}))+$/;
        switch(v.type){
            case 'equal':
                if(this.state.express.length&&reg.test(this.state.express)){
                    this.setState({
                        express:this.state.express,
                        eq:eval(this.state.express)
                    });
                }else{
                    alert('输入错误')
                }
                break;
            case 'reset':
                this.reset();
                break;
            case 'back':
                if(this.state.express.length>0){
                    this.setState({
                        express:this.state.express.slice(0,-1),
                        eq:''
                    });
                }
                break;
            case 'pos':
                var regs = /^\d+$/;
                if(this.state.express==''){
                    this.setState({
                        express:'0',
                        eq:''
                    });
                }else if(regs.test(this.state.express)){
                    if(eval(this.state.express)){
                        this.setState({
                            express:'-'+this.state.express,
                            eq:''
                        });
                    }else{
                        console.log(1)
                        this.setState({
                            express:this.state.express.slice(1),
                            eq:''
                        });
                    }
                }
                break;
            default:
                if(this.state.eq!=''){
                    this.setState({
                        express:v.name,
                        eq:''
                    });
                }else{
                    this.setState({
                        express:this.state.express+=v.name,
                        eq:''
                    });
                }


        }

    }
    reset(){
        this.setState({
            express:'',
            eq:''
        })
    }
    render(){
        let {express,eq} = this.state;
        return (
            <div className="main">
            <Header express={express} eq={eq}/>
        <Content fn={this.fn}/>
        </div>
    )
    }
}
ReactDOM.render(<Computer/>,document.querySelector('#computer'));