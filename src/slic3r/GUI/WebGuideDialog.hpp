#ifndef slic3r_WebGuideDialog_hpp_
#define slic3r_WebGuideDialog_hpp_

#include "wx/artprov.h"
#include "wx/cmdline.h"
#include "wx/notifmsg.h"
#include "wx/settings.h"
#include "wx/webview.h"

#if wxUSE_WEBVIEW_IE
#include "wx/msw/webview_ie.h"
#endif
#if wxUSE_WEBVIEW_EDGE
#include "wx/msw/webview_edge.h"
#endif

#include "wx/webviewarchivehandler.h"
#include "wx/webviewfshandler.h"
#include "wx/numdlg.h"
#include "wx/infobar.h"
#include "wx/filesys.h"
#include "wx/fs_arc.h"
#include "wx/fs_mem.h"
#include "wx/stdpaths.h"
#include <wx/frame.h>
#include <wx/tbarbase.h>
#include "wx/textctrl.h"

#include "GUI_App.hpp"
#include "libslic3r/PresetBundle.hpp"
#include "slic3r/Utils/PresetUpdater.hpp"

#include <nlohmann/json.hpp>

//GalaxySlicerNeo: Profile manager libs
#include <iostream>
#include <string>
#include <vector>
#include <curl/curl.h>
#include <miniz.h>
#include <fstream>
#include <cstdio>
#include <sys/types.h>
#include <sstream>

namespace Slic3r { namespace GUI {

class GuideFrame : public DPIDialog
{
public:
    GuideFrame(GUI_App *pGUI, long style = wxCAPTION | wxCLOSE_BOX | wxSYSTEM_MENU);
    virtual ~GuideFrame();

    enum GuidePage {
        BBL_WELCOME,
        BBL_REGION,
        BBL_MODELS,
        BBL_FILAMENTS,
        BBL_FILAMENT_ONLY,
        BBL_MODELS_ONLY
    }m_page;

    //Web Function
    void load_url(wxString &url);
    wxString SetStartPage(GuidePage startpage=BBL_WELCOME, bool load = true);

    void UpdateState();
    void OnIdle(wxIdleEvent &evt);
    // void OnClose(wxCloseEvent &evt);

    void OnNavigationRequest(wxWebViewEvent &evt);
    void OnNavigationComplete(wxWebViewEvent &evt);
    void OnDocumentLoaded(wxWebViewEvent &evt);
    void OnNewWindow(wxWebViewEvent &evt);
    void OnError(wxWebViewEvent &evt);
    void OnTitleChanged(wxWebViewEvent &evt);
    void OnFullScreenChanged(wxWebViewEvent &evt);
    void OnScriptMessage(wxWebViewEvent &evt);

    void OnScriptResponseMessage(wxCommandEvent &evt);

    //GalaxySlicerNeo: Profile manager methods
    static size_t write_to_string_callback(void* ptr, size_t size, size_t nmemb, void* userdata);
    std::string downloadFileContent(const std::string& url);

    static size_t write_to_file_callback(void* ptr, size_t size, size_t nmemb, void* userdata);
    bool downloadFile(const std::string& url, const std::string& outPath);
    bool createDirectory(const std::string& path);
    bool unzipFile(const std::string& zipPath, const std::string& extractDir);

    std::vector<int> splitVersion(const std::string& version);
    bool isNewerVersion(const std::string& version1, const std::string& version2);

    void RunScript(const wxString &javascript);

    //Logic
    bool IsFirstUse();

    //Model - Machine - Filaments
    int LoadProfileData();
    int SaveProfileData();
    int LoadProfileFamily(std::string strVendor, std::string strFilePath);
    int SaveProfile();
    int GetFilamentInfo( std::string VendorDirectory,json & pFilaList, std::string filepath, std::string &sVendor, std::string &sType);


    bool apply_config(AppConfig *app_config, PresetBundle *preset_bundle, const PresetUpdater *updater, bool& apply_keeped_changes);
    bool run();

    void        StrReplace(std::string &strBase, std::string strSrc, std::string strDes);
    std::string w2s(wxString sSrc);
    void        GetStardardFilePath(std::string &FilePath);
    //bool LoadFile(std::string jPath, std::string & sContent);

    // install plugin
    int DownloadPlugin();
    int InstallPlugin();
    int ShowPluginStatus(int status, int percent, bool &cancel);

    void on_dpi_changed(const wxRect &suggested_rect) {}

private:
    GUI_App *m_MainPtr;
    AppConfig m_appconfig_new;

    wxWebView *m_browser;
    wxButton * m_TestBtn;

    wxString m_SectionName;

    bool bbl_bundle_rsrc;
    boost::filesystem::path vendor_dir;
    boost::filesystem::path rsrc_vendor_dir;

    //First Load
    bool bFirstComplete{false};

    // User Config
    bool PrivacyUse;
    std::string m_Region;

    bool InstallNetplugin;
    bool network_plugin_ready {false};

#if wxUSE_WEBVIEW_IE
    wxMenuItem *m_script_object_el;
    wxMenuItem *m_script_date_el;
    wxMenuItem *m_script_array_el;
#endif
    // Last executed JavaScript snippet, for convenience.
    wxString m_javascript;
    wxString m_response_js;

    wxString m_bbl_user_agent;
    std::string m_editing_filament_id;
};

}} // namespace Slic3r::GUI

#endif /* slic3r_Tab_hpp_ */
