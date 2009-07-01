package cardindex.client.view;

public class LinkType extends LinkBase {

	private String strFullId;
	
	public LinkType( ViewMaster master, String strFullId, String strText ) {
		super( master, strText );
		this.strFullId = strFullId;
	}

	@Override
	public void onClick() {
		master.setMainPane( new ViewType( master, strFullId ) );
	}

}
