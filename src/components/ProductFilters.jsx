import CustomCheckbox from "./custom/CustomCheckbox"
import { useAppStore } from "../store/AppStore"
import Button from "./custom/Button";

function ProductFilters({ categories }) {
    const { filtersQuery } = useAppStore(state => state)   
    
    const handleFilter = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const hasTypeQuery = searchParams.has('type')
        // console.log(`Filters query: `, filtersQuery);
        // console.log(`Search params: `, searchParams.get('type'));
        if (!hasTypeQuery && filtersQuery.length > 0) {
            // console.log(`No queries founded`);
            searchParams.append("type", filtersQuery.join(","))
            // console.log(`New query:`, searchParams.get('type'));
            window.location.search = searchParams
        }
        else {
            if (filtersQuery.length === 0) {
                window.location.search = ''
            }
            else {
                // console.log(`Previuos params:`, searchParams.get('type').split(","));
                // console.log(`News params:`, filtersQuery);
                searchParams.delete('type')
                searchParams.append('type', filtersQuery.join(","))
                // console.log(`New query:`, searchParams.get('type'));
                window.location.search = searchParams
            }
        }
    }

    return (
        <aside className="
            hidden py-3 px-5 sm:flex w-[250px] lg:min-w-[300px] 
            flex-col items-start gap-8">
            
            <div className="flex w-full flex-col">
                <p className="font-bold text-lg mb-2">Productos</p>
                <div className="flex flex-col items-start gap-2">
                    {
                        categories.map(category => (
                            <CustomCheckbox 
                                key={category.name}
                                label={category.name} 
                                query={category.name.toLowerCase()} />
                        ))
                    }
                </div>
            </div>

            <Button text="Filter" full={true} handleClick={handleFilter} />
            {/* <button 
                type="button" 
                onClick={handleFilter}
                className={`px-10 py-2.5 rounded-lg bg-secondary_light text-grey_dark hover:bg-secondary_light focus:ring-2 focus:ring-secondary focus:outline-none font-medium text-sm w-full`}>
                Filtrar
            </button> */}
            
        </aside>
    )
}

export default ProductFilters