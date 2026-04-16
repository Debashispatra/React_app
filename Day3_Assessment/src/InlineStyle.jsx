function InlineStyle() {
    const styleObj={
        backgroundColor:"blue",
        color:"white",
        padding:"10px",
        borderRadius:"5px",
        width: "200px",
        textAlign:"center",
        margin:"10px auto",
        // marginTop:"40px"
    }

    return (
        <div style={styleObj}>
            <h1>Inline Style</h1>
        </div>
    )
}

export default InlineStyle
