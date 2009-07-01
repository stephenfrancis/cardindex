package cardindex.client;

import cardindex.client.model.Type;

import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.user.client.rpc.RemoteServiceRelativePath;

@RemoteServiceRelativePath("/CardIndexService")
public interface CardIndexService extends RemoteService {

	public Type getRootType();

	public String saveType( Type oType );		// true = success, false = fail

	public java.util.Vector<String[]> search( String strSearch );
}
