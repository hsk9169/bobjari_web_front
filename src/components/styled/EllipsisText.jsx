const EllipsisText = (props) => {
    return (
        <div style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                lineBreak: '80%'
            }}
        >
            {props.bold
            ?
                <b style={{
                    fontSize: props.size,
                    color: props.color,
                }}>
                   {props.text}
                </b> 
            :
                <span style={{
                    fontSize: props.size,
                    color: props.color,
                }}>
                    {props.text}
                </span>
            }
            
        </div>
    )
}

export default EllipsisText
