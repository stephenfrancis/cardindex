package cardindex.client.view;
import com.google.gwt.user.client.ui.*;

public class LinkBase extends Anchor {

	protected ViewMaster master;
	
	public LinkBase( ViewMaster master, String strText ) {
		super( strText );
		this.master = master;
		addClickListener( master );
	}

	public void onClick() {}

	public ViewMaster getViewMaster() {
		return master;
	}

}
