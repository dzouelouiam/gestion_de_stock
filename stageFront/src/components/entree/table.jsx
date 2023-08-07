const Table = () => {
    return ( 
        <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Nom produit</th>
                            <th>Catégorie</th>
                            <th>Source</th>
                            <th>Quantité</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th></th>
                            <td>1</td>
                            <td>efrfrf</td>
                            <td>feef</td>
                            <td>frfrf</td>
                            <td>bdsyd</td>
                        </tr>

                    </tbody>
                </table>
     );
}
 
export default Table;