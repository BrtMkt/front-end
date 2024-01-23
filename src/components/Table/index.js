export default function Table({th, children}) {
    return (
        <div style={{ paddingTop: '1%' }} className='table'>
            <table className='table-true'>
                <thead className="headerTable">
                    <tr>
                        {
                            th.map((title) => (
                                <th key={title}>{title}</th>
                            ))
                        }
                    </tr>
                </thead>
                {children}
            </table>
        </div>
    )
}