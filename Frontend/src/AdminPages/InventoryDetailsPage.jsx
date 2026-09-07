import InventoryDetailsHeader from "../components/AdminComponent/Inventory/InventoryDetails/InventoryDetailsHeader";
import InventoryHistoryTable from "../components/AdminComponent/Inventory/InventoryDetails/InventoryHistoryTable";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";
import { getProductInventory } from "../services/inventoryService";

function InventoryDetailsPage() {
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  const { id } = useParams();
  const location = useLocation();


  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const result = await getProductInventory(id)
        setInventory(result.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchInventory();
  }, [id])


  if(loading) {
    return <AdminPageLoader />
  }


  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <InventoryDetailsHeader 
        name={location.state.name}
      />

      <InventoryHistoryTable 
        inventory={inventory}
      />
    </div>
  );
}

export default InventoryDetailsPage;